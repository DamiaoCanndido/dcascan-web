import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { api } from '../services/api';
import Router from 'next/router';
import recoverUser from '../services/recoverUser';
import { AuthContextProviderProps, AuthContextType, DataResponse, LogInData, User } from '../protocols/protocols';


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProviderProps) {
    const [user , setUser] = useState<User | undefined>(undefined);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'access-token': accessToken } = parseCookies()
        const getUser = async () => {
            const user = await recoverUser();
            setUser(user)
        }
        if (accessToken) {
            getUser()
        }
    }, [])

    async function login({ email, password }: LogInData){
        const { data } = await api.post('auth/login/', {email, password})
        const response: DataResponse = data
        

        setCookie(undefined, 'refresh-token', response.tokens.refresh, {
            maxAge: 60 * 60 * 48 // 2 dias
        })
        setCookie(undefined, 'access-token', response.tokens.access, {
            maxAge: 900 // 15 minutos
        })

        api.defaults.headers['Authorization'] = `Bearer ${response.tokens.access}`

        setUser({ username: response.username, email: response.email })
        
        Router.replace('/home');
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login}}>
            {props.children}
        </AuthContext.Provider>
    )
}