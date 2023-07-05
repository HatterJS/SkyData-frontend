import styles from './Profile.module.scss';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { Layout } from '@/layouts/Layout';
import Loading from '@/components/Loading';
import Link from 'next/link';
import * as Api from '@/api';

const ConfirmEmail: NextPage = () => {
  const timerSec = 7;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [timerValue, setTimerValue] = useState(timerSec);

  const checkAuth = async (token: string) => {
    setCookie(null, '_token', token, {
      path: '/',
    });
    try {
      //check is valid token
      await Api.auth.confirmEmail();
      return true;
    } catch (err) {
      destroyCookie(null, '_token', { path: '/' });
      return false;
    }
  };

  useEffect(() => {
    const { token } = router.query as { token?: string };
    const authStatus = async () => {
      if (token) {
        const status = await checkAuth(token);
        setIsChecked(status);
        setIsLoading(false);
      }
    };
    authStatus();

    const timer = setInterval(() => {
      setTimerValue((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(timer);
      router.push('/dashboard');
    }, timerSec * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [router, router.query]);

  if (isLoading) {
    return <Loading />;
  }

  return isChecked ? (
    <Layout title='Підтвердження Email'>
      <div className={styles.loader}>
        <div className={styles.loaderTimer}>{timerValue}</div>
        <div className={styles.loaderSpinner}></div>
      </div>
      <div className={styles.messagePositive}>
        <p>Вітаємо! Ви успішно підтвердили свій Email</p>
        <p>Тепер Ви можете користуватись всіми перевагами своєї хмарки.</p>
      </div>
    </Layout>
  ) : (
    <Layout title='Підтвердження Email'>
      <div className={styles.loader}>
        <div className={styles.loaderTimer}>{timerValue}</div>
        <div className={styles.loaderSpinner}></div>
      </div>
      <div className={styles.messageNegative}>
        <p>Нажаль, Ваш токен не дійсний.</p>
        <p>
          Будь ласка, зверніться до{' '}
          <Link href={'/contacts'}>технічної підтримки.</Link>
        </p>
      </div>
    </Layout>
  );
};

export default ConfirmEmail;
