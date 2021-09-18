import axios from "axios";
import { parseCookies } from 'nookies';


export function apiServerSide(ctx?: any) {
    const { ['access-token']: accessToken } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
    });

    if (accessToken) {
        api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return api;
}