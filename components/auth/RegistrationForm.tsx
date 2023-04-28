import React from 'react';
import styles from './Auth.module.scss';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('register submit', userData);
    event.preventDefault();
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
