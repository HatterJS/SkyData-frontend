import styles from './Offers.module.scss';
import {
  clockSVG,
  laptopFileSVG,
  personalSVG,
  safeSVG,
  savingsSVG,
  seedSVG,
  sharePeopleSVG,
} from '@/static/svgSprite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import TariffPlanItem from '../TariffPlanItem';

export const Offers: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  const handleRegisterBtn = () => {
    router.push('/dashboard/auth');
  };

  useEffect(() => {
    const { _token } = parseCookies();
    _token && setIsAuth(true);
  }, []);

  return (
    <div className={styles.offers}>
      <div className={styles.firstSection}>
        <Image
          src='/img/devicesConnectCloud.png'
          alt='connection'
          width={190}
          height={170}
        />
        <div className={styles.description}>
          <h2>Особистий хмарний простір SkyData</h2>
          <p>
            Зберігайте фото, зображення та інші документи на особистій хмарі від
            SkyData, щоб завжди мати доступ до них у будь-якому місці та з
            будь-якого гаджета.
          </p>
          <div className={styles.buttonsBlock}>
            {!isAuth && <button onClick={handleRegisterBtn}>Реєстрація</button>}
            <button onClick={() => (window.location.href = '#paidServices')}>
              Тарифи
            </button>
          </div>
        </div>
      </div>
      <div className={styles.informSection}>
        <h2>Отримуй максимум від персональної хмаринки</h2>
        <div className={styles.informBody}>
          <div className={styles.informItem}>
            {laptopFileSVG}
            <p>Отримуйте доступ до Ваших файлів з будь-якого пристрою.</p>
          </div>
          <div className={styles.informItem}>
            {personalSVG}
            <p>
              Всі файли, які зберігаються на хмаринці належать тільки Вам, і
              більше нікому.
            </p>
          </div>
          <div className={styles.informItem}>
            {safeSVG}
            <p>
              Зберігання резервних копії на хмаринці убезпечить Вас від втрати
              важливої інформації.
            </p>
          </div>
          <div className={styles.informItem}>
            {sharePeopleSVG}
            <p>Діліться своїми документами або фото з друзями та близькими.</p>
          </div>
        </div>
      </div>
      <div className={styles.paidServicesSection} id='paidServices'>
        <TariffPlanItem tariff={'start'} />
        <TariffPlanItem tariff={'standart'} />
        <TariffPlanItem tariff={'maximum'} />
        <TariffPlanItem tariff={'enterprise'} />
      </div>
      <div className={styles.informSection}>
        <h2>Чому слід обрати SkyData</h2>
        <div className={styles.informBody}>
          <div className={styles.informItem}>
            <p style={{ fontSize: '42px', fontWeight: '900' }}>10k+</p>
            <p>Нам довіряють вже більше 10&nbsp;000 користувачів.</p>
          </div>
          <div className={styles.informItem}>
            {savingsSVG}
            <p>Найприємніші тарифи серед постачальників хмарного простору.</p>
          </div>
          <div className={styles.informItem}>
            {seedSVG}
            <p>Молодий сервіс, який швидко розвивається.</p>
          </div>
          <div className={styles.informItem}>
            {clockSVG}
            <p>Гарантуємо цілодобовий доступ до Вашої хмарки.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
