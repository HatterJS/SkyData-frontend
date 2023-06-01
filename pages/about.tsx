import styles from '@/styles/InformPages.module.scss';
import { Layout } from '@/layouts/Layout';
import { NextPage } from 'next';
import {
  clockSVG,
  laptopFileSVG,
  personalSVG,
  safeSVG,
  savingsSVG,
  seedSVG,
  sharePeopleSVG,
} from '@/static/svgSprite';

const About: NextPage = () => {
  return (
    <Layout title='Про нас'>
      <div className={styles.content}>
        <p>
          Ласкаво просимо до <strong>SkyData</strong> -{' '}
          <strong>надійного хмарного сховища</strong> для зберігання та обміну
          файлами!
        </p>
        <p>
          <strong>SkyData</strong> - це інноваційний сервіс, створений для того,
          щоб ви могли отримати максимум користі від персональної хмаринки. З
          нами ви зможете зберігати свої фото, зображення та інші документи на
          особистій хмарці, щоб завжди мати доступ до них у будь-якому місці та
          з будь-якого пристрою. Зручно, правда?
        </p>
        <div className={styles.informSection}>
          <div className={styles.splitter}></div>
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
              <p>
                Діліться своїми документами або фото з друзями та близькими.
              </p>
            </div>
          </div>
          <div className={styles.splitter}></div>
        </div>
        <p>
          Наш пріоритет - це ваша приватність і безпека. Усі файли, які ви
          зберігаєте на нашій хмарі, повністю належать тільки вам, і ми
          гарантуємо, що ніхто інший не матиме до них доступу. Зокрема, ми
          надаємо зберігаємо резервні копії Вашої хмарки, що захистить від
          втрати важливої інформації.
        </p>
        <p>
          SkyData також дозволяє вам легко ділитися своїми документами,
          фотографіями та іншими файлами з друзями та близькими. Просто знайдіть
          необхідний файл і поділіться посиланням - все просто і зручно.
        </p>
        <p>
          Ми пропонуємо зручні тарифи, які відповідають різним потребам. Ви
          можете обрати той, який найкраще підходить вам і вашим вимогам. Якщо
          вам потрібні більші можливості, Ви завжди можете покращити свій пакет
          послуг.
        </p>
        <div className={styles.informSection}>
          <div className={styles.splitter}></div>
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
          <div className={styles.splitter}></div>
        </div>
        <p>
          SkyData швидко набуває популярності серед користувачів. Нам вже
          довіряють більше 10 000 задоволених користувачів, які оцінюють нашу
          надійність та зручність. Ми - молодий сервіс, який постійно
          розвивається і вдосконалюється, щоб забезпечити найкращі можливості
          для роботи з файлами у хмарі.
        </p>
        <p>
          Також гарантуємо Вам цілодобовий доступ до хмарки, щоб Ви могли
          отримати свої файли у будь-який зручний для вас час.
        </p>
        <p>
          Приєднуйтесь до <strong>SkyData</strong> вже сьогодні і насолоджуйтесь
          зручністю та безпекою <strong>хмарного сховища</strong> для зберігання
          та обміну файлами!
        </p>
      </div>
    </Layout>
  );
};

export default About;
