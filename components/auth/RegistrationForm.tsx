import React from 'react';
import styles from './Auth.module.scss';

import * as Api from '@/api';
import { AxiosError } from 'axios';
import { createTemporaryNotification } from '../message';
import { setCookie } from 'nookies';
import { useForm } from 'react-hook-form';
import { emailSVG, passwordSVG, userSVG, warningSVG } from '@/static/svgSprite';

interface RegistrationFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface regData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setIsLoading,
}) => {
  const {
    register,
    formState: { errors, isValid, isSubmitting, submitCount },
    handleSubmit,
    watch,
  } = useForm<regData>({ mode: 'onBlur' });

  const onSubmit = async (data: regData): Promise<void> => {
    const { confirmPassword, ...userData } = data;
    try {
      setIsLoading(true);
      const { token } = await Api.auth.registration(userData);
      setCookie(null, '_token', token, {
        path: '/',
      });
      createTemporaryNotification(true, 'Ви успішно зареєструвались');
      setTimeout(() => {
        location.href = '/dashboard';
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof AxiosError) {
        if (err.response) {
          createTemporaryNotification(false, err.response.data.message);
        } else {
          createTemporaryNotification(false, 'Помилка реєстрації');
        }
      }
    }
  };

  return (
    <div className={styles.registrationForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          {userSVG}
          <input
            className={errors?.fullName ? styles.errorInput : ''}
            type='text'
            placeholder="Ім'я"
            {...register('fullName', {
              required: "Вкажіть повне ім'я",
              minLength: { value: 2, message: 'Не менше 2 символів' },
              maxLength: { value: 40, message: 'Не більше 40 символів' },
              pattern: {
                value: /^[A-z, А-я, І, і, Є, є, Ґ, ґ]+$/,
                message: 'Тільки букви',
              },
            })}
          />
        </label>
        {errors?.fullName && (
          <div className={styles.warningMsg}>
            {warningSVG}
            {errors?.fullName?.message || 'Помилка!'}
          </div>
        )}
        <label>
          {emailSVG}
          <input
            type='email'
            placeholder='Email'
            {...register('email', {
              required: 'Вкажіть E-mail',
              minLength: { value: 5, message: 'Не менше 5 символів' },
              maxLength: { value: 40, message: 'Не більше 40 символів' },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Не вірний формат',
              },
            })}
          />
        </label>
        {errors?.email && (
          <div className={styles.warningMsg}>
            {warningSVG}
            {errors?.email?.message || 'Помилка!'}
          </div>
        )}
        <label>
          {passwordSVG}
          <input
            type='password'
            placeholder='Пароль'
            {...register('password', {
              required: 'Вкажіть пароль',
              minLength: { value: 6, message: 'Не менше 6 символів' },
              maxLength: { value: 40, message: 'Не більше 40 символів' },
            })}
          />
        </label>
        {errors?.password && (
          <div className={styles.warningMsg}>
            {warningSVG}
            {errors?.password?.message || 'Помилка!'}
          </div>
        )}
        <label>
          <div></div>
          <input
            type='password'
            placeholder='Підтвердьте пароль'
            {...register('confirmPassword', {
              required: 'Підтвердьте пароль',
              minLength: { value: 6, message: 'Не менше 6 символів' },
              maxLength: { value: 40, message: 'Не більше 40 символів' },
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Не співпадає з паролем';
                }
              },
            })}
          />
        </label>
        {errors?.confirmPassword && (
          <div className={styles.warningMsg}>
            {warningSVG}
            {errors?.confirmPassword?.message || 'Помилка!'}
          </div>
        )}
        <label>
          <div></div>
          <input
            type='submit'
            disabled={!isValid || isSubmitting || submitCount >= 1}
            value={'Реєстрація'}
          />
        </label>
      </form>
    </div>
  );
};
