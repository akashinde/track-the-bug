import { useState, useEffect } from "react";
import { fetchUsers } from "../../service/users";
import Select from 'react-select';

export default function CreateProjectForm({ onSubmit, onClose }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        teamIds: []
    });
    const [users, setUsers] = useState([]);

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
            <Select
                options={users}
                isMulti
                closeMenuOnSelect={false}
                onChange={(selectedOptions) => {
                    setFormData(prevData => ({ ...prevData, teamIds: selectedOptions.map(option => option.label) }));
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
                <button className="button font-medium" onClick={onClose}>Cancel</button>
                <button className="button font-medium" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};