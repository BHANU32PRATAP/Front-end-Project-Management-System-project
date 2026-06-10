export interface RegisterUser {
    _id?: string
    firstName: string,
    secondName: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    term: boolean
}

export interface LoginUser {
    email: string,
    password: string,
}

