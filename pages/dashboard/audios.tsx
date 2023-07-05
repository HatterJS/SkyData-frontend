import { Layout } from '@/layouts/Layout';
import { checkAuth, checkConfirmEmail } from '@/utils/checkAuth';
import { GetServerSidePropsContext, NextPage } from 'next';
import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import DashboardLayout from '@/layouts/DashboardLayout';

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

const DashboardPhotos: NextPageWithLayout = ({ items }) => {
  return <DashboardLayout items={items} />;
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title='Хмарка - Аудіо'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  const confirmedProps = await checkConfirmEmail(ctx);
  if ('redirect' in authProps) {
    return authProps;
  }
  if ('redirect' in confirmedProps) {
    return confirmedProps;
  }

  try {
    const items = await Api.files.getAll('audios');
    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPhotos;
