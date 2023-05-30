import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { AuthForm } from '@/components/auth/AuthForm';
import { NextPage } from 'next';
import Head from 'next/head';

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Авторизація</title>
      </Head>
      <Header />
      <main>
        <AuthForm />
      </main>
      <Footer />
    </>
  );
};

export default AuthPage;
