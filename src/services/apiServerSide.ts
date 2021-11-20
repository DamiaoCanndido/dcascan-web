import axios from "axios";
import Cookie from 'js-cookie';


export function apiServerSide() {
    const accessToken = Cookie.get('access-token')
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000'
        // 'http://127.0.0.1:8000'
        // 'http://192.168.1.11:8000'
        // 'http://192.168.1.5:8000'
        // process.env.NEXT_PUBLIC_APP_URL,
    });

    if (accessToken) {
        api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return api;
}