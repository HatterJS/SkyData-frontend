import styles from './Dashboard.module.scss';
import { Header } from '@/components/Header';
import Loading from '@/components/Loading';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext, NextPage } from 'next';

const DashboardPage: NextPage = () => {
  return (
    <main className={styles.main}>
      <Header />
      <h1>Dashboard</h1>
    </main>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) {
    return authProps;
  }
  return {
    props: {},
  };
};

export default DashboardPage;
