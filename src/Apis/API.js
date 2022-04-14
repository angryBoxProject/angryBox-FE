import axios from 'axios';

const URL = axios.create({
    baseURL: process.env.REACT_APP_IP,
});

export { URL };
