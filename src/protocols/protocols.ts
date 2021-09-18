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