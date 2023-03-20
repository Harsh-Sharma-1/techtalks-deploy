import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// List of all the endpoints
// authentication
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);
export const logout = () => api.post('/api/logout');

// rooms
export const createRoom = (data) => api.post('/api/rooms', data);
export const getAllRooms = () => api.get('/api/rooms');
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);

// podcasts
export const createPodcast = (data) => api.post('/api/podcasts', data);
export const getAllPodcasts = () => api.get('/api/podcasts');
export const getPodcast = (podcastId) => api.get(`/api/podcasts/${podcastId}`);
export const likePodcast = (id) => api.get(`/api/podcasts/${id}/likepodcast`);

// discussions
export const createDiscussion = (data) => api.post('/api/discussions', data);
export const getAllDiscussions = () => api.get('/api/discussions');
export const getDiscussion = (discussionId) =>
    api.get(`/api/discussions/${discussionId}`);
export const addComment = (id, data, addfor) => {
    if (addfor === 'discussion') {
        return api.post(`/api/discussions/${id}/comment`, data);
    } else {
        return api.post(`/api/podcasts/${id}/comment`, data);
    }
};

// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;
