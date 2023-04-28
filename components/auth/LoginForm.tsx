import React from 'react';
import styles from './Auth.module.scss';

import * as Api from '@/api';
import { setCookie } from 'nookies';
import { AxiosError } from 'axios';
import { createTemporaryNotification } from '../message';

export const LoginForm: React.FC = () => {
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
      createTemporaryNotification(true, 'Ви успішно авторизувались');
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
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={changeUserData}
          value={userData.email}
        />
        <input
          type='password'
          name='password'
          placeholder='Пароль'
          onChange={changeUserData}
          value={userData.password}
        />
        <input type='submit' disabled={validation()} />
      </form>
    </div>
  );
};
