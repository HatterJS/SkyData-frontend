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

export interface UpdateCommonFormDTO {
    fullName: string;
}

export interface UpdateCommonResponseDTO {
    fullName: string;
}

export interface UpdatePassFormDTO {
    password: string;
}

export interface UpdatePassResponseDTO {
    token: string;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    fullName: string;
    avatar: string;
    createdAt: string;
    isConfirmed: boolean;
    maxSize: number;
    tariffPlan: string;
    updatedAt: string;
    usedSpace: {
        images: number;
        documents: number;
        total: number;
        _id: string;
    }
}