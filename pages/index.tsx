import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Banner } from '@/components/Banner';
import { Offers } from '@/components/Offers';
import { Footer } from '@/components/Footer';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>SkyData - хмарне сховище</title>
        <meta
          name='description'
          content='Зберігайте фото, зображення та інші документи на особистій хмарі від SkyData, щоб завжди мати доступ до них у будь-якому місці та з будь-якого гаджета.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <div className={styles.main}>
          <Banner />
          <Offers />
        </div>
      </main>
      <CookieConsent
        buttonText='Прийняти'
        disableStyles={true}
        containerClasses={styles.cookieContainer}
        contentClasses={styles.cookieContent}
        buttonClasses={styles.cookieBtn}
      >
        <strong>SkyData</strong> використовує файли <strong>cookie</strong> для
        покращення взаємодії відповідно до Загального регламенту ЄС щодо обробки
        персональних даних. Будь ласка, ознайомтесь з нашою{' '}
        <Link href='/cookies-policy'>
          Політикою&nbsp;використання&nbsp;Cookies
        </Link>
        .
      </CookieConsent>
      <Footer />
    </>
  );
}
