// import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import * as Api from '@/api';

import {
  homeSVG,
  logoSVG,
  logoutSVG,
  userSettingsSVG,
} from '@/static/svgSprite';

export const Header: React.FC = () => {
  // const router = useRouter();
  // const selectMenu = router.pathname;

  const logoutHandle = () => {
    Api.auth.logout();
    location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.cover}>
        <div className={styles.logo}>
          {logoSVG}
          <p>SkyData</p>
        </div>
        <menu>
          <div className={styles.menuItem}>
            {homeSVG}
            <p>Головна</p>
          </div>
          <div className={styles.menuItem}>
            {userSettingsSVG}
            <p>Профіль</p>
          </div>
        </menu>
        <div className={styles.menuItem} onClick={logoutHandle}>
          {logoutSVG}
          <p>Вийти</p>
        </div>
      </div>
    </header>
  );
};
