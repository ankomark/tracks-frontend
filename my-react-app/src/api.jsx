// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/songs'; // Adjust the URL as needed

// Function to get the token from local storage
const getAuthToken = () => localStorage.getItem('accessToken');

export const fetchTracks = async () => {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/tracks/`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
    return response.data;
};

export const fetchProfiles = async () => {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/profiles/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchUsers = async () => {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/users/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchPlaylists = async () => {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/playlists/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchComments = async (trackId) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/tracks/${trackId}/comments/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Assuming this returns the list of comments
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        // Handle error responses better by checking if the error has a response
        if (error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data.detail || 'Could not fetch comments.'}`);
        }
        throw new Error('Network error: Could not connect to the server.');
    }
};

// Post a new comment for a specific track
export const postComment = async (trackId, content) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/tracks/${trackId}/comments/`, { content }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        return response.data; // Assuming this returns the newly created comment
    } catch (error) {
        console.error('Failed to post comment:', error);
        // Handle error responses better by checking if the error has a response
        if (error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data.detail || 'Could not post comment.'}`);
        }
        throw new Error('Network error: Could not connect to the server.');
    }
};
export const updateLike = async (trackId) => {
    const token = getAuthToken(); // Ensure token is included
    const response = await fetch(`${API_URL}/tracks/${trackId}/toggle_like/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to toggle likes');
    }

    const data = await response.json();
    return data.likes_count; // Return the updated like count
};

export const fetchCategories = async () => {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/categories/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createTrack = async (formData) => {
    const token = getAuthToken();
    if (!token) throw new Error('No access token found');

    const response = await axios.post(`${API_URL}/tracks/`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Ensure proper handling of FormData
        },
    });
    return response.data;
};

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/token/`, {
        username,
        password,
    });
    const { access, refresh } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    return response.data;
};

export const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) throw new Error('No refresh token found');

    const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
        refresh,
    });
    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    return access;
};
export const downloadTrack = async (trackId, fileName) => {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/tracks/${trackId}/download/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob', // Important for file download
        });

        // Create a blob URL for the downloaded file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName || 'track.mp3'); // Default to 'track.mp3' if no name is provided
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading the track:', error);
        throw new Error('Failed to download the track.');
    }
};

export const toggleFavorite = async (trackId) => {
    const token = localStorage.getItem('authToken'); // Adjust according to your auth setup
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(`/api/songs/tracks/${trackId}/favorite/`, {}, config);
        return response.data.message; // "Added to favorites" or "Removed from favorites"
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
};
// Additional API calls can be added here as needed
