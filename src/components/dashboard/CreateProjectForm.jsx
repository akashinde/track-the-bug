import { useState, useEffect } from "react";
import Select from 'react-select';
import { fetchUsers } from "../../service/users";

export default function CreateProjectForm({ onSubmit, onClose }) {
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'planning',
        assignedTo: ''
    });

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers.map(user => ({ value: user._id, label: user.name })));
            } catch (error) {
                console.error("Error fetching users:", error);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="create-form">
            <input type="text" name="name" placeholder="Project name" value={formData.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Project description" value={formData.description} onChange={handleChange} required />
            <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            <Select
                placeholder="Assignees"
                options={users}
                isMulti
                closeMenuOnSelect={false}
                onChange={(selectedOptions) => {
                    setFormData(prevData => ({ ...prevData, assignedTo: selectedOptions.map(option => option.value) }));
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
                <button className="button font-medium" onClick={onClose}>Cancel</button>
                <button className="button font-medium" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};