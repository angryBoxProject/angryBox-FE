import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../shared/utils/Cookie';

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
            console.log(localStorage.getItem('flag'));
            if (!localStorage.getItem('flag')) {
                localStorage.setItem('flag', true);
                console.log('토큰만료');
                console.log('토큰 만료 테스트1');
                const { data } = await refreshaxios();

                originalRequest.headers.authorization = getCookie('token');
                return axios(originalRequest);
            }
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
            console.log('토큰 만료 테스트2');
            console.log('token', res.data.data.access_token);
            setCookie('token', res.data.data.access_token);
            localStorage.removeItem('flag');

            return res.data.data.access_token;
        })
        .catch(error => {
            console.log('test E', error);
            console.log('토큰 만료 테스트3');
            deleteCookie('token');
            localStorage.removeItem('nickname');
            localStorage.removeItem('memberId');
            window.alert(
                '로그인 정보가 만료되었습니다 재 로그인이 필요합니다.',
            );
            localStorage.removeItem('flag');

            console.log('TEST:::로그인페이지로 보내야하나 로그체크로 안보냄');
            // window.location.assign('/new/login');
        });
    console.log('response:::', response);
    setCookie('token', `Bearer ${response.data.data.access_token}`);
    console.log('test');
    console.log('test');

    return response;
};
// const refreshaxios = async _ => {
//     const response = await tokenURL.post(`/auth/refresh`, _);
//     console.log(response);
// };
export { URL, tokenURL };
