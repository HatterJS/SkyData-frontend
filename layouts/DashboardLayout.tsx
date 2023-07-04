import styles from '../pages/dashboard/Dashboard.module.scss';
import { UploadButton } from '@/components/UploadButton';
import {
  allFilesSVG,
  audioSVG,
  fileSVG,
  photoSVG,
  videoSVG,
} from '@/static/svgSprite';
import { NextPage } from 'next';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/FileList';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '@/components/Loading';

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

const DashboardLayout: NextPageWithLayout = ({ items }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = router.pathname;
  const handleMenuItemChange = (route: string) => {
    router.push(route);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.homePage}>
      <div className={styles.menu}>
        <UploadButton setIsLoading={setIsLoading} />
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
          defaultChecked={currentPage === '/dashboard/videos'}
          onChange={() => handleMenuItemChange('/dashboard/videos')}
        />
        <label htmlFor='menuItem3'>
          {videoSVG} <p>Відео</p>{' '}
        </label>
        <input
          type='radio'
          id='menuItem4'
          name='menuItem'
          defaultChecked={currentPage === '/dashboard/audios'}
          onChange={() => handleMenuItemChange('/dashboard/audios')}
        />
        <label htmlFor='menuItem4'>
          {audioSVG} <p>Аудіо</p>{' '}
        </label>
        <input
          type='radio'
          id='menuItem5'
          name='menuItem'
          defaultChecked={currentPage === '/dashboard/documents'}
          onChange={() => handleMenuItemChange('/dashboard/documents')}
        />
        <label htmlFor='menuItem5'>
          {fileSVG} <p>Документи</p>{' '}
        </label>
      </div>
      <div className={styles.files}>
        <FileList items={items} />
      </div>
    </div>
  );
};

export default DashboardLayout;
