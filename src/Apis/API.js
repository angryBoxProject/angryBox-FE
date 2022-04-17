import axios from 'axios';
import { getCookie } from '../shared/utils/Cookie';

const URL = axios.create({
    baseURL: process.env.REACT_APP_IP,
});
const tokenURL = axios.create({
    baseURL: process.env.REACT_APP_IP,
    headers: {
        Authorization: getCookie('token'),
    },
    withCredentials: true,
});

export { URL, tokenURL };
