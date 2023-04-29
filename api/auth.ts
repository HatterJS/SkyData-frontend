import axios from '@/core/axios';
import {
    LoginFormDTO,
    LoginResponseDTO,
    RegistrationFormDTO,
    RegistrationResponseDTO,
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

export const getMe = async (): Promise<User> => {
    const { data } = await axios.get('/users/me');
    return data;
};

export const logout = () => {
    destroyCookie(null, '_token', { path: '/' });
};
