import { UploadButton } from '@/components/UploadButton';
import styles from './Dashboard.module.scss';
import { Layout } from '@/layouts/Layout';
import { fileSVG, photoSVG } from '@/static/svgSprite';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext, NextPage } from 'next';
import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/FileList';

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

const DashboardPage: NextPageWithLayout = ({ items }) => {
  return (
    <main className={styles.homePage}>
      <div className={styles.menu}>
        <UploadButton />
        <input type='radio' id='menuItem1' name='menuItem' defaultChecked />
        <label htmlFor='menuItem1'>
          {fileSVG} <p>Файли</p>{' '}
        </label>
        <input type='radio' id='menuItem2' name='menuItem' />
        <label htmlFor='menuItem2'>
          {photoSVG} <p>Фото</p>{' '}
        </label>
      </div>
      <div className={styles.files}>
        <FileList items={items} />
      </div>
    </main>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title='Панель / Головна'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll();
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
