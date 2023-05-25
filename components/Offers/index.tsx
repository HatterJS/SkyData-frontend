import styles from './Offers.module.scss';
import {
  laptopFileSVG,
  personalSVG,
  safeSVG,
  sharePeopleSVG,
} from '@/static/svgSprite';
import Image from 'next/image';

export const Offers: React.FC = () => {
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
            <button>Реєстрація</button>
            <button>Тарифи</button>
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
    </div>
  );
};
