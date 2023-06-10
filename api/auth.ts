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

export const login = async (
    values: LoginFormDTO
): Promise<LoginResponseDTO> => {
    const { data } = await axios.post('/auth/login', values);
    return data;
};

export const registration = async (
    values: RegistrationFormDTO
): Promise<RegistrationResponseDTO> => {
    const { data } = await axios.post('/auth/register', values);
    return data;
};

export const updateCommon = async (values: UpdateCommonFormDTO): Promise<UpdateCommonResponseDTO> => {
    const { data } = await axios.patch('/users/updatecommon', values);
    return data;
}

export const updatePass = async (values: UpdatePassFormDTO): Promise<UpdatePassResponseDTO> => {
    const { data } = await axios.patch('/users/updatepass', values);
    return data;
}

export const deleteUser = async () => {
    const { data } = await axios.delete('/users/deleteuser');
    return data;
}

export const getMe = async (): Promise<User> => {
    const { data } = await axios.get('/users/me');
    destroyCookie(null, '_token', { path: '/' });
    return data;
};

export const logout = () => {
    destroyCookie(null, '_token', { path: '/' });
};
