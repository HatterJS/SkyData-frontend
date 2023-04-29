import React from 'react';
import styles from './Auth.module.scss';

import * as Api from '@/api';
import { AxiosError } from 'axios';
import { createTemporaryNotification } from '../message';
import { setCookie } from 'nookies';

export const RegistrationForm: React.FC = () => {
  const [userData, setUserData] = React.useState({
    fullName: '',
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
    console.log('register submit', userData);
    event.preventDefault();
    try {
      const { token } = await Api.auth.registration(userData);
      setCookie(null, '_token', token, {
        path: '/',
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          createTemporaryNotification(false, err.response.data.message);
        } else {
          createTemporaryNotification(false, 'Помилка реєстрації');
        }
      }
    }
  };

  const validation = (): boolean => {
    return userData.fullName && userData.email && userData.password
      ? false
      : true;
  };

  return (
    <div className={styles.registrationForm}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='fullName'
          placeholder="Ім'я"
          onChange={changeUserData}
          value={userData.fullName}
        />
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
