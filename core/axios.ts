import axios from 'axios';
import { parseCookies } from 'nookies';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_NAME}`;

axios.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const { _token } = parseCookies();
        config.headers.Authorization = 'Bearer ' + _token;
    }
    return config;
});

export default axios;