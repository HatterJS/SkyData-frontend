'use client';

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import styles from './Header.module.scss';
import * as Api from '@/api';
import Link from 'next/link';
import Image from 'next/image';

import {
  cloudSVG,
  contactSVG,
  diagramSVG,
  enterSVG,
  homeSVG,
  infoSVG,
  logoutSVG,
  tariffSVG,
  userSVG,
  userSettingsSVG,
} from '@/static/svgSprite';

export const Header: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const logoutHandle = () => {
    Api.auth.logout();
    location.href = '/';
  };

  useEffect(() => {
    const { _token } = parseCookies();
    _token && setIsAuth(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.cover}>
        <Link className={styles.logo} href='/'>
          <Image src='/img/logotype.png' alt='logo' width={48} height={30} />
          <p>SkyData</p>
        </Link>
        <menu>
          <Link className={styles.menuItem} href={'/'}>
            {homeSVG}
            <p>Головна</p>
          </Link>
          <Link className={styles.menuItem} href={'/about'}>
            {infoSVG}
            <p>Про&nbsp;нас</p>
          </Link>
          <Link className={styles.menuItem} href={'/contacts'}>
            {contactSVG}
            <p>Контакти</p>
          </Link>
        </menu>
        {isAuth ? (
          <menu className={styles.userBlock}>
            <Link className={styles.menuItem} href={'/dashboard'}>
              {cloudSVG}
              <p>Хмарка</p>
            </Link>
            <div className={styles.userMenu}>
              <div className={styles.menuItem}>
                {userSVG}
                <p>Профіль</p>
              </div>
              <div className={styles.dropdownMenu}>
                <ul>
                  <Link href={'/profile'}>
                    <li className={styles.menuItem}>
                      {diagramSVG}
                      Інформація
                    </li>
                  </Link>
                  <Link href={'/profile/settings'}>
                    <li className={styles.menuItem}>
                      {userSettingsSVG}
                      Налаштування
                    </li>
                  </Link>
                  <Link href={'/profile/tariff'}>
                    <li className={styles.menuItem}>
                      {tariffSVG}
                      Зміна тарифу
                    </li>
                  </Link>
                  <li className={styles.menuItem} onClick={logoutHandle}>
                    {logoutSVG} Вийти
                  </li>
                </ul>
              </div>
            </div>
          </menu>
        ) : (
          <menu>
            <Link className={styles.menuItem} href='/dashboard/auth'>
              {enterSVG}
              <p>Авторизація</p>
            </Link>
          </menu>
        )}
      </div>
    </header>
  );
};
