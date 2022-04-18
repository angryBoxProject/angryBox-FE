import axios from 'axios';
import { getCookie } from '../shared/utils/Cookie';

const URL = axios.create({
    baseURL: process.env.REACT_APP_IP,
});
const tokenURL = axios.create({
    baseURL: process.env.REACT_APP_IP,
    headers: {
        Authorization: getCookie('token'),
        // Authorization:
        //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IjExMTEiLCJpZCI6MSwiZXhwIjoxNjUwMjg3NjAyLCJlbWFpbCI6IjExMTFAbmF2ZXIuY29tIn0.vbdNOta9kmNa2VzUxtTzA-Td_m6ysZJZds05wHnc7Lk',
    },
    withCredentials: true,
});

export { URL, tokenURL };
