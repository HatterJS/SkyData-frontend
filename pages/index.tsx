import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Banner } from '@/components/Banner';
import { Offers } from '@/components/Offers';
import { Footer } from '@/components/Footer';

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
      <Footer />
    </>
  );
}
