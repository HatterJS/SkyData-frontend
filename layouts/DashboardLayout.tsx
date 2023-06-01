import styles from '../pages/dashboard/Dashboard.module.scss';
import { UploadButton } from '@/components/UploadButton';
import { allFilesSVG, fileSVG, photoSVG } from '@/static/svgSprite';
import { NextPage } from 'next';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/FileList';
import { useRouter } from 'next/router';

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

const DashboardLayout: NextPageWithLayout = ({ items }) => {
  const router = useRouter();
  const currentPage = router.pathname;
  const handleMenuItemChange = (route: string) => {
    router.push(route);
  };
  return (
    <div className={styles.homePage}>
      <div className={styles.menu}>
        <UploadButton />
        <input
          type='radio'
          id='menuItem1'
          name='menuItem'
          defaultChecked={currentPage === '/dashboard'}
          onChange={() => handleMenuItemChange('/dashboard')}
        />
        <label htmlFor='menuItem1'>
          {allFilesSVG} <p>Всі файли</p>{' '}
        </label>
        <input
          type='radio'
          id='menuItem2'
          name='menuItem'
          defaultChecked={currentPage === '/dashboard/photos'}
          onChange={() => handleMenuItemChange('/dashboard/photos')}
        />
        <label htmlFor='menuItem2'>
          {photoSVG} <p>Зображення</p>{' '}
        </label>
        <input
          type='radio'
          id='menuItem3'
          name='menuItem'
          defaultChecked={currentPage === '/dashboard/documents'}
          onChange={() => handleMenuItemChange('/dashboard/documents')}
        />
        <label htmlFor='menuItem3'>
          {fileSVG} <p>Документи</p>{' '}
        </label>
      </div>
      <div className={styles.files}>
        <FileList items={items} />
      </div>
    </div>
  );
};

// DashboardLayout.getLayout = (page: React.ReactNode) => {
//   return <Layout title='Панель / Головна'>{page}</Layout>;
// };

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const authProps = await checkAuth(ctx);
//   if ('redirect' in authProps) {
//     return authProps;
//   }

//   try {
//     const items = await Api.files.getAll('all');
//     return {
//       props: {
//         items,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: { items: [] },
//     };
//   }
// };

export default DashboardLayout;
