import styles from './Profile.module.scss';
import { GetServerSidePropsContext, NextPage } from 'next';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';
import Image from 'next/image';
import {
  UpdateCommonFormDTO,
  UpdatePassFormDTO,
  User,
} from '@/api/dto/auth.dto';
import React from 'react';
import { deleteSVG, warningSVG } from '@/static/svgSprite';
import { deleteUser, updateCommon, updatePass } from '@/api/auth';
import { createTemporaryNotification } from '@/components/message';
import { useRouter } from 'next/router';

interface Props {
  userData: User;
}
interface RegistrationData {
  avatar: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const ProfileSettings: NextPageWithLayout<Props> = ({ userData }) => {
  const router = useRouter();
  //ref for avatar input
  const inputAvatar = React.useRef<HTMLInputElement>(null);
  //state for user data
  const [registrationData, setRegistrationData] =
    React.useState<RegistrationData>({
      avatar: userData.avatar,
      fullName: userData.fullName,
      email: userData.email,
      password: '',
      confirmPassword: '',
    });
  //check user common data
  function userCommonValidation() {
    if (registrationData.fullName.length < 2) {
      return "Перевірте ім'я";
    }
    if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        registrationData.email
      )
    ) {
      return 'Перевірте email';
    }
    return 'Підтвердити';
  }
  //check user data
  function userPasswordValidation() {
    if (
      registrationData.password.length < 6 ||
      registrationData.password !== registrationData.confirmPassword
    ) {
      return 'Перевірте новий пароль';
    }
    return 'Підтвердити';
  }
  //send common data and get user data from backend
  async function sendNameData() {
    const updateData: UpdateCommonFormDTO = {
      fullName: registrationData.fullName,
    };
    try {
      await updateCommon(updateData);
      createTemporaryNotification(true, 'Інформацію оновлено успішно');
    } catch (err) {
      createTemporaryNotification(false, 'Не вдалось оновити інформацію');
    }
  }
  //send password data and get user data from backend
  async function sendPasswordData() {
    console.log('change password');
    const updateData: UpdatePassFormDTO = {
      password: registrationData.password,
    };
    try {
      await updatePass(updateData);
      setRegistrationData((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
      createTemporaryNotification(true, 'Пароль змінено');
    } catch (err) {
      createTemporaryNotification(false, 'Не вдалось змінити пароль');
    }
  }
  //upload avatar to server
  async function uploadAvatar(file: any) {
    if (file.size > 100000) {
      createTemporaryNotification(false, 'Розмір файлу перевищує 100кБ');
      return;
    }
    console.log(file);
    // try {
    //   const formData = new FormData();
    //   formData.append('image', file);
    //   const { data } = await axios.post(`/upload?dir=users`, formData);
    //   deleteAvatar();
    //   setRegistrationData((prev) => ({
    //     ...prev,
    //     avatarUrl: backendUrl + data.url,
    //   }));
    //   dispatch(
    //     fetchChangeUserData({
    //       avatarUrl: backendUrl + data.url,
    //     })
    //   );
    // } catch (err) {
    //   alert('Не вдалось завантажити аватар');
    // }
  }
  //clear avatar
  function clearAvatar() {
    console.log('clear avatar');
    //   deleteAvatar();
    //   inputAvatar.current.value = '';
    //   setRegistrationData((prev) => ({ ...prev, avatarUrl: defaultAvatarUrl }));
    //   axios.patch(`/authorization/changeData`, {
    //     avatarUrl: defaultAvatarUrl,
    //   });
  }
  // //delete avatar from server
  // function deleteAvatar() {
  //   if (registrationData.avatarUrl !== defaultAvatarUrl) {
  //     axios.delete(
  //       `delete/${registrationData.avatarUrl.slice(
  //         registrationData.avatarUrl.lastIndexOf('/') + 1
  //       )}?dir=users`
  //     );
  //   }
  // }

  //delete user account and all files
  async function deleteAccount() {
    if (
      window.confirm(
        'УВАГА! Видалення облікового запису - незворотня процедура.\nВи дійсно бажаєте видалити обліковий запис?'
      )
    ) {
      try {
        const deleteResult = await deleteUser();
        console.log(deleteResult);
        createTemporaryNotification(
          true,
          `Користувача ${deleteResult.userName} видалено успішно\nВидалено ${deleteResult.fileCount} файлів.`
        );
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } catch (err) {
        createTemporaryNotification(false, 'Під час видалення виникли помилки');
      }
    }
  }

  return (
    <main>
      <div className={styles.personalInfoBlock}>
        <div className={styles.avatar}>
          <label htmlFor='avatar'>
            <Image
              src={registrationData.avatar}
              alt='avatar'
              width={200}
              height={200}
            />
          </label>
          <input
            ref={inputAvatar}
            type='file'
            name='avatar'
            id='avatar'
            accept='image/*'
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                uploadAvatar(event.target.files[0]);
              }
            }}
          />
          {registrationData.avatar !== 'defaultAvatarUrl' && (
            <button onClick={clearAvatar}>{deleteSVG}</button>
          )}
        </div>
        <div className={styles.nameBlock}>
          <h3>Зміна імені:</h3>
          <div className={styles.inputField}>
            <input
              type='text'
              placeholder="Ім'я"
              value={registrationData.fullName}
              onChange={(event) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
            />
            {/* <div>Повне ім&apos;я</div> */}
          </div>
          <div className={styles.inputField}>
            <input
              type='email'
              disabled
              placeholder=' '
              value={registrationData.email}
              onChange={(event) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
            />
          </div>
          <button
            className='acceptButton'
            onClick={sendNameData}
            disabled={userCommonValidation() !== 'Підтвердити'}
          >
            {userCommonValidation()}
          </button>
        </div>
        <div className={styles.passwordBlock}>
          <h3>Зміна паролю:</h3>
          <div className={styles.inputField}>
            <input
              type='password'
              placeholder='Новий пароль'
              autoComplete='new-password'
              value={registrationData.password}
              onChange={(event) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
          </div>
          <div className={styles.inputField}>
            <input
              type='password'
              placeholder='Підтвердіть пароль'
              autoComplete='new-password'
              value={registrationData.confirmPassword}
              onChange={(event) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
            />
          </div>
          <button
            className='acceptButton'
            onClick={sendPasswordData}
            disabled={userPasswordValidation() !== 'Підтвердити'}
          >
            {userPasswordValidation()}
          </button>
        </div>
      </div>
      <div className={styles.splitter}></div>
      <div className={styles.deleteAccountBlock}>
        <h3>Видалення облікового запису:</h3>
        <div className={styles.deleteWarning}>
          {warningSVG} УВАГА! Видалення облікового запису - незворотня
          процедура, що призведе до виделення Вашої особистої хмарки та всіх
          файлів, які на ній зберігаються.
        </div>
        <button onClick={deleteAccount}>Видалити</button>
      </div>
    </main>
  );
};

ProfileSettings.getLayout = (page: React.ReactNode) => {
  return <Layout title='Налаштування профілю'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) {
    return authProps;
  }
  const userData = await Api.auth.getMe();
  return {
    props: {
      userData,
    },
  };
};

export default ProfileSettings;
