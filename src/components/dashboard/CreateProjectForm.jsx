import { useState, useEffect } from "react";
import { fetchUsers } from "../../service/users";

// Mock formData for testing
const mockFormData = {
    name: 'Test Project',
    description: 'This is a test project description',
    teamIds: []
};

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
                setUsers(fetchedUsers);
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
        <form onSubmit={handleSubmit} className="create-form">
            <input type="text" name="name" placeholder="Project name" value={formData.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Project description" value={formData.description} onChange={handleChange} required />
            <select
                multiple
                name="teamIds"
                value={formData.teamIds}
                onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData(prevData => ({ ...prevData, teamIds: selectedOptions }));
                }}
                className="team-members-select"
            >
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
                <button className="button font-medium" onClick={onClose}>Cancel</button>
                <button className="button font-medium" type="submit">Submit</button>
            </div>
        </form>
    );
};