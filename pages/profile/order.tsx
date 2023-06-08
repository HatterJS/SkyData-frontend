import styles from './Profile.module.scss';
import { GetServerSidePropsContext } from 'next';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';

const Order = () => {
  return (
    <div>
      <div>Ordeer</div>
    </div>
  );
};

Order.getLayout = (page: React.ReactNode) => {
  return <Layout title='Зміна тарифного плану'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) {
    return authProps;
  }
  const userData = await Api.auth.getMe();
  return {
    props: {
      userData,
    },
  };
};

export default Order;
