import styles from './Tariff.module.scss';
import { GetServerSidePropsContext, NextPage } from 'next';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';
import TariffPlanItem from '@/components/TariffPlanItem';
import { useForm } from 'react-hook-form';
import { warningSVG } from '@/static/svgSprite';
import { useRouter } from 'next/router';
import { User } from '@/api/dto/auth.dto';
import { CSSProperties } from 'react';
import { createTemporaryNotification } from '@/components/message';

interface Props {
  userData: User;
}
interface orderData {
  fullName: string;
  email: string;
  period: number;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const Order: NextPageWithLayout<Props> = ({ userData }) => {
  const router = useRouter();
  const tariff = Array.isArray(router.query?.tariff)
    ? router.query?.tariff[0]
    : router.query?.tariff || 'standart';
  const defaultPeriod = 3;

  const tariffPrice: {
    [key: string]: number;
    start: number;
    standart: number;
    maximum: number;
    enterprise: number;
  } = {
    start: 0,
    standart: 50,
    maximum: 250,
    enterprise: 500,
  };

  const {
    register,
    formState: { errors, isValid, isSubmitting, submitCount },
    handleSubmit,
    reset,
    watch,
  } = useForm<orderData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: orderData): Promise<void> => {
    const tgResponse = await Api.telegram.orderToTelegram({
      userId: userData._id,
      fullName: data.fullName,
      email: data.email,
      tariff,
      previousTariff: userData.tariffPlan,
      period: data.period,
      totalPrice: data.period * 250,
    });
    if (tgResponse) {
      createTemporaryNotification(true, 'Запит надіслано успішно');
      setTimeout(() => {
        router.push({
          pathname: '/profile/tariff/orderSuccess',
          query: {
            previousTariff: userData.tariffPlan,
            tariff,
            period: data.period,
            totalPrice: data.period * 250,
          },
        });
      }, 2000);
    } else {
      createTemporaryNotification(false, 'Не вдалось зробити замовлення');
    }
    // reset();
  };
  return (
    <main className={styles.order}>
      <h2>Ви обрали:</h2>
      <TariffPlanItem tariff={tariff} isActive={false} />
      <div className={styles.splitter}></div>
      <div className={styles.orderForm}>
        <h2>Оформлення запиту:</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Повне ім&apos;я:
            <input
              type='text'
              defaultValue={userData.fullName}
              {...register('fullName', {
                required: "вкажіть повне ім'я",
                minLength: { value: 2, message: 'не менше 2 символів' },
                maxLength: { value: 40, message: 'не більше 40 символів' },
                pattern: {
                  value: /^[A-z, А-я, І, і, Є, є, Ґ, ґ]+$/,
                  message: 'тільки букви',
                },
              })}
            />
            {errors?.fullName && (
              <div className={styles.warningMsg}>
                {warningSVG}
                <p>
                  {(errors?.fullName?.message as React.ReactNode) ||
                    "перевірте ім'я"}
                </p>
              </div>
            )}
          </label>
          <label>
            E-mail:
            <input
              type='email'
              defaultValue={userData.email}
              {...register('email', {
                required: 'вкажіть E-mail',
                minLength: { value: 5, message: 'не менше 5 символів' },
                maxLength: { value: 40, message: 'не більше 40 символів' },
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'не вірний формат',
                },
              })}
            />
            {errors?.email && (
              <div className={styles.warningMsg}>
                {warningSVG}
                <p>
                  {(errors?.email?.message as React.ReactNode) ||
                    'перевірте E-mail'}
                </p>
              </div>
            )}
          </label>
          {tariff !== 'start' && (
            <label>
              <div className={styles.periodTools}>
                <div className={styles.rangeBlock}>
                  <input
                    type='range'
                    min={0}
                    max={12}
                    step={1}
                    defaultValue={defaultPeriod}
                    {...register('period', { required: true, min: 1 })}
                  />
                  <div className={styles.rangeValues}>
                    <p>0</p>
                    <div>{watch('period') || defaultPeriod}</div>
                    <p>12</p>
                  </div>
                </div>
                <div
                  className={styles.circleDiagram}
                  style={
                    {
                      '--percent': `${
                        (watch('period') || defaultPeriod) * 8.33
                      }`,
                    } as CSSProperties
                  }
                >
                  {watch('period') || defaultPeriod} міс
                </div>
              </div>
            </label>
          )}
          {tariff !== 'start' && (
            <div className={styles.totalCost}>
              <p>Загальна вартість:</p>
              <div>{tariffPrice[tariff] * watch('period')} грн.</div>
            </div>
          )}
          {tariff !== userData.tariffPlan ? (
            <input
              type='submit'
              value={submitCount >= 1 ? 'Запит надіслано' : 'Замовити'}
              disabled={!isValid || isSubmitting || submitCount >= 1}
            />
          ) : (
            'Ви вже використовуєте цей тариф.'
          )}
        </form>
      </div>
    </main>
  );
};

Order.getLayout = (page: React.ReactNode) => {
  return <Layout title='Зміна тарифного плану'>{page}</Layout>;
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

export default Order;
