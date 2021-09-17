import { createContext, ReactNode, useState } from 'react';
import api from '../services/api';

type LogInData = {
    email: string;
    password: string;
}

type User = {
    username: string;
    email: string;
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
        console.log(data['username'])
        setUser({ username: data['username'], email: data['email'] })
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login}}>
            {props.children}
        </AuthContext.Provider>
    )
}