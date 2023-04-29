export interface LoginFormDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
}

export interface RegistrationFormDTO {
    fullName: string;
    email: string;
    password: string;
}

export interface RegistrationResponseDTO {
    token: string;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    fullName: string;
}