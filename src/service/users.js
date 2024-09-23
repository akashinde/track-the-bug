import API from './api.js'

export async function fetchUsers() {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}