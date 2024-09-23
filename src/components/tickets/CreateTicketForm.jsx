import { useState, useEffect } from "react";
import { fetchUsers } from "../../service/users";
import { fetchProjects } from "../../service/projects";

// Mock formData for testing
const mockFormData = {
    title: 'Test Ticket',
    description: 'This is a test ticket description',
    status: 'open',
    priority: 'medium',
    severity: 'low',
    assignedTo: 'John Doe',
    projectId: 'Bug Tracker App',
    reportedBy: 'User2'
};

export default function CreateTicketForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        severity: '',
        assignedTo: '',
        projectId: '',
        reportedBy: ''
    });
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Use mock data for testing
        setFormData(mockFormData);
        const fetchDropdownData = async () => {
            try {
                const [fetchedUsers, fetchedProjects] = await Promise.all([
                    fetchUsers(),
                    fetchProjects()
                ]);
                setUsers(fetchedUsers);
                setProjects(fetchedProjects);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="create-form">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
            <select name="priority" value={formData.priority} onChange={handleChange} required>
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select name="severity" value={formData.severity} onChange={handleChange} required>
                <option value="">Select Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} required>
                <option value="">Select Assignee</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <select name="projectId" value={formData.projectId} onChange={handleChange} required>
                <option value="">Select Project</option>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                ))}
            </select>
            <select name="reportedBy" value={formData.reportedBy} onChange={handleChange} required>
                <option value="">Select Reporter</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
                <button className="button font-medium" onClick={onClose}>Close</button>
                <button className="button font-medium" type="submit">Submit</button>
            </div>
        </form>
    );
};