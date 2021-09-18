import { createContext, ReactNode, useState } from 'react';
import { setCookie } from 'nookies';
import api from '../services/api';
import Router from 'next/router';

type LogInData = {
    email: string;
    password: string;
}

type User = {
    username: string;
    email: string;
}

type DataResponse = {
    username: string;
    email: string;
    tokens: {
        access: string,
        refresh: string
    }
}

type AuthContextType = {
    isAuthenticated: boolean;
    user?: User;
    login: (data: LogInData) => Promise<void>
}

export interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProviderProps) {
    const [user , setUser] = useState<User | undefined>(undefined);
    const isAuthenticated = !!user;

    async function login({ email, password }: LogInData){
        const { data } = await api.post('auth/login/', {email, password})
        const response: DataResponse = data
        setUser({ username: response.username, email: response.email })

        setCookie(undefined, 'refresh-token', response.tokens.refresh, {
            maxAge: 60 * 60 * 48 // 2 dias
        })
        setCookie(undefined, 'access-token', response.tokens.access, {
            maxAge: 900 // 15 minutos
        })
        
        Router.push('/buckets');
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login}}>
            {props.children}
        </AuthContext.Provider>
    )
}