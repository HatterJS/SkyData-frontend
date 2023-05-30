import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
          <div className={styles.layout}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};
