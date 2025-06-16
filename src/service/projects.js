import API from './api.js'

export async function fetchProjects() {
    try {
        const response = await API.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function createProject(projectData) {
    try {
        const response = await API.post('/projects/add', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export async function updateProject(projectId, projectData) {
    try {
        const response = await API.put(`/projects/${projectId}`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

export async function deleteProject(projectId) {
    try {
        const response = await API.delete(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export async function fetchProjectById(projectId) {
    try {
        const response = await API.get(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

export async function fetchProjectsByStatus(status) {
    try {
        const projects = await fetchProjects();
        return projects.filter(project => project.status === status);
    } catch (error) {
        console.error('Error fetching projects by status:', error);
        return [];
    }
}

export async function fetchProjectsByAssignee(userId) {
    try {
        const projects = await fetchProjects();
        return projects.filter(project => project.assignedTo === userId);
    } catch (error) {
        console.error('Error fetching projects by assignee:', error);
        return [];
    }
}