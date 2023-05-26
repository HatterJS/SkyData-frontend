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
        <div className={styles.paidServiceItem}>
          <Image
            src='/img/startPlane.png'
            alt='start'
            width={130}
            height={75}
          />
          <h3>Старт</h3>
          <ul>
            <li>Хмаринка розміром 1Гб.</li>
            <li>Доступ з усіх пристроїв.</li>
          </ul>
          <h4>БЕЗКОШТОВНО</h4>
        </div>
        <div className={styles.paidServiceItem}>
          <Image
            src='/img/standartPlane.png'
            alt='start'
            width={130}
            height={75}
          />
          <h3>Стандарт</h3>
          <ul>
            <li>Хмаринка розміром 15Гб.</li>
            <li>Цілодобова підтримка.</li>
            <li>Доступ з усіх пристроїв.</li>
          </ul>
          <h4>50 грн. / міс.</h4>
        </div>
        <div className={styles.paidServiceItem}>
          <Image
            src='/img/maximumPlane.png'
            alt='start'
            width={130}
            height={75}
          />
          <h3>Максимум</h3>
          <ul>
            <li>Хмаринка розміром 50Гб.</li>
            <li>Цілодобова підтримка.</li>
            <li>Доступ з усіх пристроїв.</li>
          </ul>
          <h4>250 грн. / міс.</h4>
        </div>
        <div className={styles.paidServiceItem}>
          <Image
            src='/img/corporationPlane.png'
            alt='start'
            width={130}
            height={75}
          />
          <h3>Корпорація</h3>
          <ul>
            <li>Хмаринка розміром 500Гб.</li>
            <li>Можливість ділитись файлами.</li>
            <li>Цілодобова підтримка.</li>
            <li>Доступ з усіх пристроїв.</li>
          </ul>
          <h4>500 грн. / міс.</h4>
        </div>
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
