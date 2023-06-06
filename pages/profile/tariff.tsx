import { GetServerSidePropsContext } from 'next';
import styles from './Profile.module.scss';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';

const ProfileSettings = () => {
  return (
    <main>
      <div>TARIFF</div>
    </main>
  );
};

ProfileSettings.getLayout = (page: React.ReactNode) => {
  return <Layout title='Тарифний план'>{page}</Layout>;
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

export default ProfileSettings;
