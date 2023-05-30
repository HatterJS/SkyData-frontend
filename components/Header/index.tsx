import styles from './Header.module.scss';
import * as Api from '@/api';
import Link from 'next/link';
import Image from 'next/image';

import { homeSVG, logoutSVG, userSettingsSVG } from '@/static/svgSprite';

export const Header: React.FC = () => {
  const logoutHandle = () => {
    Api.auth.logout();
    location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.cover}>
        <Link className={styles.logo} href='/'>
          <Image src='/img/logotype.png' alt='logo' width={53} height={30} />
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
