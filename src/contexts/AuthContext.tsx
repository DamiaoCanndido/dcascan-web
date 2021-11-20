import { createContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import recoverUser from '../services/recoverUser';
import { AuthContextProviderProps, AuthContextType, DataResponse, LogInData, User } from '../protocols/protocols';


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProviderProps) {

    const navigate = useNavigate();

    const [user , setUser] = useState<User | undefined>(undefined);
    const isAuthenticated = !!user;

    useEffect(() => {
        const accessToken = Cookie.get('access-token')
        const getUser = async () => {
            const user = await recoverUser();
            setUser(user)
        }
        if (accessToken) {
            getUser()
        }
    }, [])

    async function login({ email, password, rememberPassword }: LogInData){
        const { data } = await api.post('auth/login/', {email, password})
        const response: DataResponse = data
        

        if (rememberPassword) {
            Cookie.set('refresh-token', response.tokens.access, {expires: 1})
            Cookie.set('access-token', response.tokens.access, {expires: 1})
        } else {
            Cookie.set('refresh-token', response.tokens.access)
            Cookie.set('access-token', response.tokens.access)
        }

        api.defaults.headers['Authorization'] = `Bearer ${response.tokens.access}`

        setUser({ username: response.username, email: response.email, is_superuser: response.is_superuser })
        
        //navigate('/home', {replace: true});
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login}}>
            {props.children}
        </AuthContext.Provider>
    )
}