import { ReactNode } from "react"

export interface AuthContextProviderProps {
    children: ReactNode
}

export type LogInData = {
    email: string;
    password: string;
    rememberPassword: boolean; 
}

export type User = {
    username: string;
    email: string;
    is_superuser: boolean;
}

export type DataResponse = {
    username: string;
    email: string;
    tokens: {
        access: string;
        refresh: string;
    };
    is_superuser: boolean;
}

export type AuthContextType = {
    isAuthenticated: boolean;
    user?: User;
    login: (data: LogInData) => Promise<void>
}



export type folderFileTypes = {
    id: string;
    file?: string | null;
    owner: string;
    created_at: string;
    updated_at: string;
    name: string;
    key?: string | null;
    folder?: string;
    root?: string | null;
    size?: number | null;
    checkAll?: boolean; 
    setAllIdsFolder?: React.Dispatch<React.SetStateAction<string[]>>;
    setAllIdsFiles?: React.Dispatch<React.SetStateAction<string[]>>;
    allIdsFolder?: string[];
    allIdsFiles?: string[];
    folderSelected?: string;
    setFolderSelected?: React.Dispatch<React.SetStateAction<string>>;
    defaultBuckets?: folderFileTypes[];
    setDefaultBuckets?: React.Dispatch<React.SetStateAction<folderFileTypes[]>>;
    isGoHome?: boolean;
    setIsGoHome?: React.Dispatch<React.SetStateAction<boolean>>;
}
  
export type bucketProps = {
    buckets: Array<folderFileTypes>
}