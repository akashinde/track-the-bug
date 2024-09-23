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
        return [];
    }
}