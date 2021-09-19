import { ReactNode } from "react"

export interface AuthContextProviderProps {
    children: ReactNode
}

export type LogInData = {
    email: string;
    password: string;
}

export type User = {
    username: string;
    email: string;
}

export type DataResponse = {
    username: string;
    email: string;
    tokens: {
        access: string,
        refresh: string
    }
}

export type AuthContextType = {
    isAuthenticated: boolean;
    user?: User;
    login: (data: LogInData) => Promise<void>
}



export type folderFileTypes = {
    id: string,
    file?: string,
    owner: string,
    created_at: string,
    updated_at: string,
    name: string,
    key?: string,
    folder?: string
    root?: string
}
  
export type bucketProps = {
    buckets: Array<folderFileTypes>
}