import axios from 'axios';
import { getCookie, setCookie } from '../shared/utils/Cookie';

const URL = axios.create({
    baseURL: process.env.REACT_APP_IP,
});
const tokenURL = axios.create({
    baseURL: process.env.REACT_APP_IP,
    // withCredentials: true,
});
tokenURL.interceptors.request.use(
    config => {
        const token = getCookie('token');
        if (token) {
            config.headers['authorization'] = token;
            config.withCredentials = true;
            return config;
        }
        return config;
    },
    error => {
        return;
    },
);

tokenURL.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const { response, config } = error;
        const originalRequest = config;
        console.log(response);
        if (
            response.data.message === '만료된 토큰' &&
            !originalRequest._retry
        ) {
            console.log('토큰만료');
            const { data } = await refreshaxios();
            console.log('token', data);
            setCookie('token', `Bearer ${data.data.data.access_token}`);

            originalRequest.headers.authorization = getCookie('token');
            return axios(originalRequest);
        }
        return Promise.reject(error);
    },
);

const refreshaxios = async _ => {
    const response = await axios.post(
        `${process.env.REACT_APP_IP}/auth/refresh`,
        _,
        {
            withCredentials: true,
            headers: {
                Authorization: getCookie('token'),
                'Content-Type': 'application/json',
            },
        },
    );
    console.log('response:::', response);

    return response;
};
// const refreshaxios = async _ => {
//     const response = await tokenURL.post(`/auth/refresh`, _);
//     console.log(response);
// };
export { URL, tokenURL };
