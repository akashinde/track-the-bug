import API from './api.js'

export async function createUser(user) {
    try {
        const response = await API.post('/auth/user/create', user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return [];
    }
}

export async function loginUser(user) {
    try {
        const response = await API.post('/auth/user/login', user);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        return [];
    }
}