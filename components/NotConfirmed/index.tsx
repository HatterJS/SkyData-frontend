import styles from './NotConfirmed.module.scss';

import * as Api from '@/api';

import { emailSVG, warningSVG } from '@/static/svgSprite';
import { createTemporaryNotification } from '../message';

export const NotConfirmed: React.FC = () => {
  const handleResendBtn = async () => {
    const button = document.querySelector(
      `.${styles.resendConfirmation}`
    ) as HTMLElement;
    button.style.display = 'none';
    try {
      const message = await Api.auth.resendConfirmation();
      createTemporaryNotification(true, message);
    } catch (err) {
      createTemporaryNotification(false, 'Лист підтвердження не відправлено.');
    }
  };

  return (
    <>
      <div className={styles.warningConfirmation}>
        {warningSVG}
        <div className={styles.message}>
          <p>
            УВАГА! На Ваш E-mail надіслано лист для активації облікового запису.
            Наразі Вам не доступне хмарне сховище.
          </p>
          <div className={styles.shadow}></div>
        </div>
      </div>
      <div className={styles.resendConfirmation}>
        <p>
          Якщо ви не отримали лист для підтвердження E-mail скористайтесь
          кнопкою &quot;Направити повторно&quot;
        </p>
        <button className='resendConfirmationBtn' onClick={handleResendBtn}>
          {emailSVG} Направити повторно
        </button>
      </div>
      <div className={styles.splitter}></div>
    </>
  );
};
