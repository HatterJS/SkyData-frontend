import styles from '@/styles/InformPages.module.scss';
import { Layout } from '@/layouts/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ideaSVG, phoneSVG, teamSVG, techProblemSVG } from '@/static/svgSprite';

const Contacts: NextPage = () => {
  return (
    <Layout title='Контакти'>
      <div className={styles.content}>
        <p>
          Виникли питання або потрібна додаткова інформація, будь ласка,
          звертайтесь:
        </p>
        <div className={styles.informSection}>
          <div className={styles.splitter}></div>
          <div className={styles.informBody}>
            <div className={styles.informItem}>
              {techProblemSVG}
              <ul>
                Технічні&nbsp;проблеми:
                <li>+38(099)777-55-55</li>
                <li>technical@skydata.com</li>
              </ul>
            </div>
            <div className={styles.informItem}>
              {phoneSVG}
              <ul>
                Загальні&nbsp;питання:
                <li>+38(099)777-44-44</li>
                <li>common@skydata.com</li>
              </ul>
            </div>
            <div className={styles.informItem}>
              {ideaSVG}
              <ul>
                Маєте&nbsp;пропозиції:
                <li>+38(099)777-33-33</li>
                <li>offers@skydata.com</li>
              </ul>
            </div>
            <div className={styles.informItem}>
              {teamSVG}
              <ul>
                Бажаєте&nbsp;долучитись:
                <li>+38(099)777-22-22</li>
                <li>hr@skydata.com</li>
              </ul>
            </div>
          </div>
          <div className={styles.splitter}></div>
        </div>
        <p>
          Ми розуміємо, що ваш час дуже цінний, тому зробимо все можливе, щоб
          якнайшвидше та якнайбільш ефективно відповісти на Ваші запитання.
        </p>
        <Link
          className={styles.contacts}
          href='https://t.me/chaosChronicle_bot'
          target={'_blank'}
          rel='noreferrer'
        >
          <h2>Звертайтесь цілодобово</h2>
          <div className={styles.tmSupportBody}>
            <Image
              src='/img/assistant_QR.png'
              alt='telegram'
              width={110}
              height={110}
            />
            <div className={styles.constactsDescribe}>
              <ul>
                <li>виникли технічні проблеми</li>
                <li>маєте цікаві пропозиції</li>
                <li>бажаєте долучитись до нашої команди</li>
              </ul>
            </div>
          </div>
        </Link>
        <p>
          Дякуємо за використання сервісу <strong>SkyData</strong> і
          сподіваємося на продуктивну співпрацю з Вами!
        </p>
      </div>
    </Layout>
  );
};

export default Contacts;
