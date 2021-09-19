export interface errorRegisterResponse {
    [key: string]: Array<string>
}

export function returnAllErrors(error: errorRegisterResponse){
    const newError: errorRegisterResponse = error
    const errors = Object.values(newError)
    return errors
}