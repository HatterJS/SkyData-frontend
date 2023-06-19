import styles from './Tariff.module.scss';
import { NextPage } from 'next';
import { Layout } from '@/layouts/Layout';
import TariffPlanItem from '@/components/TariffPlanItem';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { arrowSVG } from '@/static/svgSprite';

interface queryProps {
  previousTariff: string;
  tariff: string;
  period: number;
  totalPrice: number;
}

const OrderSuccess: NextPage = () => {
  const router = useRouter();
  const queryProps: queryProps = {
    previousTariff: router.query.previousTariff as string,
    tariff: router.query.tariff as string,
    period: Number(router.query.period),
    totalPrice: Number(router.query.totalPrice),
  };

  return (
    <Layout title='Успішне замовлення тарифу'>
      <div className={styles.successOrder}>
        <p>
          Вітаємо, Ваше замовлення на зміну тарифного плану було успішно
          прийняте.
        </p>
        <p>
          Найближчим часом на Вашу електронну пошту буде надіслано лист із
          детальними умовами переходу на новий тарифний план.
        </p>
        <div className={styles.splitter}></div>
        <div className={styles.tariffsUpdate}>
          <TariffPlanItem tariff={queryProps.previousTariff} isActive={false} />
          {arrowSVG}
          <TariffPlanItem tariff={queryProps.tariff} isActive={false} />
        </div>
        <div className={styles.splitter}></div>
        <p>
          <b>Період:</b> {queryProps.period} міс.
        </p>
        <p>
          <b>Загальна вартість:</b> {queryProps.totalPrice} грн.
        </p>
        <div className={styles.splitter}></div>
        <p>
          У разі будь-яких проблем або питань щодо зміни тарифного плану, будь
          ласка, зв&apos;яжіться з нашою{' '}
          <Link href={'/contacts'}>підтримкою</Link>.
        </p>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
