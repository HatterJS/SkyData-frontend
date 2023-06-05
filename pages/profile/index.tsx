import styles from '@/styles/Profile.module.scss';
import { User } from '@/api/dto/auth.dto';
import { GetServerSidePropsContext, NextPage } from 'next';
import * as Api from '@/api';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
// import { logoutSVG } from '@/static/svgSprite';
import UsedSpaceInfo from '@/components/UsedSpaceInfo';
import TariffPlanItem from '@/components/TariffPlanItem';

interface Props {
  userData: User;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  // const logoutHandle = () => {
  //   Api.auth.logout();
  //   location.href = '/';
  // };
  // console.log(userData);

  return (
    <main className={styles.profile}>
      <h2>Персональні дані</h2>
      <div>
        <p>
          Повне ім&apos;я: <b>{userData.fullName}</b>
        </p>
        <p>
          E-mail: <b>{userData.email}</b>
        </p>
        <p>
          Обсяг хмарки: <b>{userData.maxSize} Гб</b>
        </p>
        {/* <br /> */}
        {/* <button onClick={logoutHandle}>{logoutSVG}Вийти</button> */}
      </div>
      <div className={styles.splitter}></div>
      <h2>Використання простору</h2>
      <UsedSpaceInfo userData={userData} />
      <div className={styles.splitter}></div>
      <h2>Тарифний план</h2>
      <TariffPlanItem tariff={userData.tariffPlan} />
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title='Профіль користувача'>{page}</Layout>;
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
