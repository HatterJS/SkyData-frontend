import styles from './Profile.module.scss';
import { User } from '@/api/dto/auth.dto';
import { GetServerSidePropsContext, NextPage } from 'next';
import * as Api from '@/api';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
// import { logoutSVG } from '@/static/svgSprite';
import UsedSpaceInfo from '@/components/UsedSpaceInfo';
import TariffPlanItem from '@/components/TariffPlanItem';
import Image from 'next/image';
import { warningSVG } from '@/static/svgSprite';

interface Props {
  userData: User;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  return (
    <main className={styles.profile}>
      {!userData.isConfirmed && (
        <div className={styles.warningConfirmation}>
          {warningSVG}
          <div className={styles.message}>
            <p>
              УВАГА! На Ваш E-mail надіслано лист для активації облікового
              запису. Наразі Вам не доступне хмарне сховище.
            </p>
            <div className={styles.shadow}></div>
          </div>
        </div>
      )}
      <h2>Персональні дані:</h2>
      <div className={styles.profileInfo}>
        <div className={styles.avatarNotInteractive}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_NAME}/uploads/avatars/${userData.avatar}`}
            alt='avatar'
            width={100}
            height={100}
          />
        </div>
        <div>
          <p>
            <b>Повне ім&apos;я:</b> {userData.fullName}
          </p>
          <p>
            <b>E-mail:</b> {userData.email}
          </p>
          <p>
            <b>Обсяг хмарки:</b> {userData.maxSize} МБ
          </p>
          {/* <br /> */}
          {/* <button onClick={logoutHandle}>{logoutSVG}Вийти</button> */}
        </div>
      </div>
      <div className={styles.splitter}></div>
      <h2>Використання простору:</h2>
      <UsedSpaceInfo userData={userData} />
      <div className={styles.splitter}></div>
      <h2>Тарифний план:</h2>
      <TariffPlanItem tariff={userData.tariffPlan} isActive={false} />
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
