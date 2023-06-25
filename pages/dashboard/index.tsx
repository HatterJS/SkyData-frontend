import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
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

const DashboardPage: NextPageWithLayout = ({ items }) => {
  console.log(items);
  return <DashboardLayout items={items} />;
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title='Хмарка - Всі файли'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('all');
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

export default DashboardPage;
