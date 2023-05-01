import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import * as Api from '@/api';
import Link from 'next/link';

import {
  homeSVG,
  logoSVG,
  logoutSVG,
  userSettingsSVG,
} from '@/static/svgSprite';

export const Header: React.FC = () => {
  const router = useRouter();

  const logoutHandle = () => {
    Api.auth.logout();
    location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.cover}>
        <Link className={styles.logo} href='/'>
          {logoSVG}
          <p>SkyData</p>
        </Link>
        <menu>
          <Link className={styles.menuItem} href={'/dashboard'}>
            {homeSVG}
            <p>Головна</p>
          </Link>
          <Link className={styles.menuItem} href={'/dashboard/profile'}>
            {userSettingsSVG}
            <p>Профіль</p>
          </Link>
        </menu>
        <div className={styles.menuItem} onClick={logoutHandle}>
          {logoutSVG}
          <p>Вийти</p>
        </div>
      </div>
    </header>
  );
};
