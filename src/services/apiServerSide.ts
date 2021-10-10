import axios from "axios";
import { parseCookies } from 'nookies';


export function apiServerSide(ctx?: any) {
    const { ['access-token']: accessToken } = parseCookies(ctx)
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_APP_URL
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