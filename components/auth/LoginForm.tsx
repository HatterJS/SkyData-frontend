import React from 'react';
import styles from './Auth.module.scss';

import * as Api from '@/api';
import { setCookie } from 'nookies';
import { AxiosError } from 'axios';
import { createTemporaryNotification } from '../message';
import {
  emailSVG,
  facebookSVG,
  googleSVG,
  passwordSVG,
  twitterSVG,
} from '@/static/svgSprite';

interface LoginFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setIsLoading }) => {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  });

  const changeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { token } = await Api.auth.login(userData);
      setCookie(null, '_token', token, {
        path: '/',
      });
      setIsLoading(true);
      setUserData({
        email: '',
        password: '',
      });
      createTemporaryNotification(true, 'Ви успішно авторизувались');
      setTimeout(() => {
        location.href = '/dashboard';
        setIsLoading(false);
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response) {
          createTemporaryNotification(false, err.response.data.message);
        } else {
          createTemporaryNotification(false, 'Помилка авторизації');
        }
      }
    }
  };

  const validation = (): boolean => {
    return userData.email && userData.password ? false : true;
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit}>
        <label>
          {emailSVG}
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={changeUserData}
            value={userData.email}
          />
        </label>
        <label>
          {passwordSVG}
          <input
            type='password'
            name='password'
            placeholder='Пароль'
            onChange={changeUserData}
            value={userData.password}
          />
        </label>
        <label>
          <div></div>
          <input type='submit' disabled={validation()} value={'Вхід'} />
        </label>
        <div className={styles.socialAuth}>
          <p>Авторизація через соіцальні мережі:</p>
          <div>
            {googleSVG}
            {facebookSVG}
            {twitterSVG}
          </div>
        </div>
      </form>
    </div>
  );
};
