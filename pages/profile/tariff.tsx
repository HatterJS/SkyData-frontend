import { GetServerSidePropsContext, NextPage } from 'next';
import styles from './Profile.module.scss';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';
import { User } from '@/api/dto/auth.dto';
import TariffPlanItem from '@/components/TariffPlanItem';

interface Props {
  userData: User;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const ProfileSettings: NextPageWithLayout<Props> = ({ userData }) => {
  const allTariffs = ['start', 'standart', 'maximum', 'enterprise'].filter(
    (tariff) => tariff !== userData.tariffPlan
  );
  return (
    <main className={styles.tariff}>
      <h2>Поточний тарифний план:</h2>
      <TariffPlanItem tariff={userData.tariffPlan} isActive={false} />
      <div className={styles.splitter}></div>
      <h2>Обрати інший тарийний план:</h2>
      <div className={styles.chooseTariff}>
        {allTariffs.map((tariff) => (
          <TariffPlanItem key={tariff} tariff={tariff} isActive={true} />
        ))}
      </div>
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
