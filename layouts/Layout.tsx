import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>
        <div className={styles.main}>
          <h1>{title}</h1>
          <div className={styles.layout}>{children}</div>
        </div>
      </main>
      <CookieConsent
        buttonText='Прийняти'
        disableStyles={true}
        containerClasses={styles.cookieContainer}
        contentClasses={styles.cookieContent}
        buttonClasses={styles.cookieBtn}
        expires={365}
      >
        <strong>SkyData</strong> використовує файли <strong>cookie</strong> для
        покращення взаємодії відповідно до Загального регламенту ЄС щодо обробки
        персональних даних. Будь ласка, ознайомтесь з нашою{' '}
        <Link href='/cookies-policy'>
          Політикою&nbsp;використання&nbsp;Cookies
        </Link>
      </CookieConsent>
      <Footer />
    </>
  );
};
