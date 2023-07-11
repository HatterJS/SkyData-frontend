import axios from '@/core/axios';
import {
    LoginFormDTO,
    LoginResponseDTO,
    RegistrationFormDTO,
    RegistrationResponseDTO,
    UpdateCommonFormDTO,
    UpdateCommonResponseDTO,
    UpdatePassFormDTO,
    UpdatePassResponseDTO,
    User,
} from './dto/auth.dto';
import { destroyCookie } from 'nookies';
import { createTemporaryNotification } from '@/components/message';

export const getMe = async (): Promise<User> => {
    const { data } = await axios.get('/users/me');
    // destroyCookie(null, '_token', { path: '/' });
    return data;
};

export const registration = async (
    values: RegistrationFormDTO
): Promise<RegistrationResponseDTO> => {
    const { data } = await axios.post('/auth/register', values);
    return data;
};

export const login = async (
    values: LoginFormDTO
): Promise<LoginResponseDTO> => {
    const { data } = await axios.post('/auth/login', values);
    return data;
};

export const confirmEmail = async (): Promise<boolean> => {
    const { data } = await axios.patch('/users/confirmation');
    return data;
}

export const resendConfirmation = async (): Promise<string> => {
    const { data } = await axios.get('/auth/resendMail');
    return data;
}

export const updateCommon = async (values: UpdateCommonFormDTO): Promise<UpdateCommonResponseDTO> => {
    const { data } = await axios.patch('/users/updatecommon', values);
    return data;
}

export const updatePass = async (values: UpdatePassFormDTO): Promise<UpdatePassResponseDTO> => {
    const { data } = await axios.patch('/users/updatepass', values);
    return data;
}

export const updateAvatar = async (file: any): Promise<void> => {
    if (file.size > 5000000) {
        createTemporaryNotification(false, 'Розмір файлу перевищує 5мБ');
        throw new Error;
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post('/users/avatar', formData);

    return data;
}

export const deleteAvatar = async () => {
    const { data } = await axios.delete('/users/avatar');

    return data;
}

export const deleteUser = async () => {
    const { data } = await axios.delete('/users/deleteuser');
    destroyCookie(null, '_token', { path: '/' });
    return data;
}

export const logout = () => {
    destroyCookie(null, '_token', { path: '/' });
};
