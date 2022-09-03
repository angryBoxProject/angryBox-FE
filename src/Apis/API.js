import axios from 'axios';
import { getCookie, setCookie } from '../shared/utils/Cookie';

const URL = axios.create({
    baseURL: process.env.REACT_APP_IP,
});
const tokenURL = axios.create({
    baseURL: process.env.REACT_APP_IP,
    // withCredentials: true,
});
URL.interceptors.request.use(
    config => {
        config.withCredentials = true;
        return config;
    },
    error => {
        return;
    },
);
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

            originalRequest.headers.authorization = getCookie('token');
            return axios(originalRequest);
        }
        return Promise.reject(error);
    },
);

const refreshaxios = async _ => {
    console.log('test');
    const response = await axios
        .post(`${process.env.REACT_APP_IP}/auth/refresh`, _, {
            withCredentials: true,
            headers: {
                Authorization: getCookie('token'),
            },
        })
        .then(res => {
            console.log('test', res);
        })
        .catch(error => {
            console.log('test E', error);
        });
    console.log('response:::', response);
    setCookie('token', `Bearer ${response.data.data.access_token}`);
    console.log('test');

    return response;
};
// const refreshaxios = async _ => {
//     const response = await tokenURL.post(`/auth/refresh`, _);
//     console.log(response);
// };
export { URL, tokenURL };
