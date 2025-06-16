import { useState, useEffect } from "react";
import { fetchUsers } from "../../service/users";
import { fetchProjects } from "../../service/projects";
import Select from 'react-select';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, TYPE_OPTIONS } from "../../constants.js";

export default function CreateTicketForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        type: '',
        assignedTo: [],
        projectId: '',
        reportedBy: ''
    });
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const statusOptions = STATUS_OPTIONS.map(status => ({ value: status.toLowerCase().replace(' ', '_'), label: status }));
    const priorityOptions = PRIORITY_OPTIONS.map(priority => ({ value: priority.toLowerCase().replace(' ', '_'), label: priority }));
    const typeOptions = TYPE_OPTIONS.map(type => ({ value: type.toLowerCase().replace(' ', '_'), label: type }));

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [fetchedUsers, fetchedProjects] = await Promise.all([
                    fetchUsers(),
                    fetchProjects()
                ]);
                setUsers(fetchedUsers.map(user => ({ value: user._id, label: user.name })));
                setProjects(fetchedProjects.map(project => ({ value: project._id, label: project.name })));
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOptions, name) => {
        setFormData(prevData => {
            if (name === 'assignedTo') {
                return {
                    ...prevData,
                    assignedTo: selectedOptions.map(option => option.value)
                };
            }
            if (name === 'projectId' || name === 'reportedBy') {
                return {
                    ...prevData,
                    [name]: selectedOptions.value
                };
            }
            return {
                ...prevData,
                [name]: selectedOptions.label
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="create-form">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <Select
                placeholder="Type"
                options={typeOptions}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'type')}
            />
            <Select
                placeholder="Assignees"
                options={users}
                isMulti
                closeMenuOnSelect={false}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'assignedTo')}
            />
            <Select
                placeholder="Status"
                options={statusOptions}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'status')}
            />
            <Select
                placeholder="Priority"
                options={priorityOptions}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'priority')}
            />
            <Select
                placeholder="Project"
                options={projects}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'projectId')}
            />
            <Select
                placeholder="Reporter"
                options={users}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'reportedBy')}
            />
            <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
                <button className="button font-medium" onClick={onClose}>Close</button>
                <button className="button font-medium" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};