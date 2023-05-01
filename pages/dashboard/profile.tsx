import styles from '@/styles/Profile.module.scss';
import { User } from '@/api/dto/auth.dto';
import { GetServerSidePropsContext, NextPage } from 'next';
import * as Api from '@/api';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
import { logoutSVG } from '@/static/svgSprite';

interface Props {
  userData: User;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const logoutHandle = () => {
    Api.auth.logout();
    location.href = '/';
  };

  return (
    <main>
      <div>
        <h1>Мій профіль</h1>
        <br />
        <p>
          ID: <b>{userData._id}</b>
        </p>
        <p>
          Повне ім&apos;я: <b>{userData.fullName}</b>
        </p>
        <p>
          E-mail: <b>{userData.email}</b>
        </p>
        <br />
        <button onClick={logoutHandle}>{logoutSVG}Вийти</button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title='Панель / Профіль'>{page}</Layout>;
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

export default DashboardProfilePage;
