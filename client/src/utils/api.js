import axios from 'axios';

// import store from '../store';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
