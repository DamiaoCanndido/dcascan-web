import { User } from '../protocols/protocols';
import { api } from './api';


export default async function recoverUser () {
    const { data } = await api.get('auth/user/')
    const response: User = data
    return response
}