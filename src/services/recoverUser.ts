import { api } from './api';

type User = {
    username: string;
    email: string;
}

export default async function recoverUser () {
    const { data } = await api.get('auth/user/')
    const response: User = data
    return response
}