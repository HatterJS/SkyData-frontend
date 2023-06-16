import styles from './Profile.module.scss';
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

interface Props {
  userData: User;
}

interface WithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}
type NextPageWithLayout<P = {}> = NextPage<P> & WithLayout;

const Order: NextPageWithLayout<Props> = ({ userData }) => {
  const router = useRouter();
  const defaultPeriod = 3;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <main className={styles.order}>
      <h2>Ви обрали:</h2>
      <TariffPlanItem
        tariff={
          Array.isArray(router.query?.tariff)
            ? router.query?.tariff[0]
            : router.query?.tariff || 'standart'
        }
        isActive={false}
      />
      <div className={styles.splitter}></div>
      <div className={styles.orderForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Оформлення запиту:</h2>
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
          <label>
            <div className={styles.periodTools}>
              <div className={styles.rangeBlock}>
                <input
                  type='range'
                  min={0}
                  max={12}
                  step={1}
                  defaultValue={defaultPeriod}
                  {...register('period', { required: true })}
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
                  { '--percent': `${watch('period') * 8.33}` } as CSSProperties
                }
              >
                {watch('period')} міс
              </div>
            </div>
          </label>
          <div className={styles.totalCost}>
            <p>Загальна вартість:</p>
            <div>{250 * watch('period')} грн.</div>
          </div>
          <input type='submit' value={'Замовити'} disabled={!isValid} />
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
