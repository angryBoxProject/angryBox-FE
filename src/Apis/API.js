import axios from 'axios';
import { getCookie } from '../shared/utils/Cookie';

const URL = axios.create({
    baseURL: process.env.REACT_APP_IP,
});
const tokenURL = axios.create({
    baseURL: process.env.REACT_APP_IP,
    withCredentials: true,
});
tokenURL.interceptors.request.use(
    config => {
        const token = getCookie('token');
        if (token) {
            config.headers['authorization'] = token;
            return config;
        }
        return config;
    },
    error => {
        return;
    },
);

export { URL, tokenURL };
