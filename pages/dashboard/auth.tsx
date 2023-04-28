import { AuthForm } from '@/components/auth/AuthForm';
import { NextPage } from 'next';
import Head from 'next/head';

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard / Auth</title>
      </Head>
      <main>
        <AuthForm />
      </main>
    </>
  );
};

export default AuthPage;
