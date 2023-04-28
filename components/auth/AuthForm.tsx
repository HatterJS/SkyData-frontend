import React from 'react';
import styles from './Auth.module.scss';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

export const AuthForm: React.FC = () => {
  const [authReg, setAuthReg] = React.useState(true);

  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__tabs}>
        <input
          type='radio'
          id='login'
          name='authMethod'
          value='login'
          defaultChecked
          onClick={() => setAuthReg(true)}
        />
        <label htmlFor='login'>Авторизація</label>
        <input
          type='radio'
          id='register'
          name='authMethod'
          value='register'
          onClick={() => setAuthReg(false)}
        />
        <label htmlFor='register'>Реєстрація</label>
      </div>
      {authReg ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};
