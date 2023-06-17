import styles from './Tariff.module.scss';
import { NextPage } from 'next';
import { Layout } from '@/layouts/Layout';
import TariffPlanItem from '@/components/TariffPlanItem';
import { useRouter } from 'next/router';

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
      <div className={styles.content}>
        <h2>Попередній тариф:</h2>
        <TariffPlanItem tariff={queryProps.previousTariff} isActive={false} />
        <h2>Новий тариф:</h2>
        <TariffPlanItem tariff={queryProps.tariff} isActive={false} />
        <p>Період: {queryProps.period} місяців</p>
        <p>Загальна ціна складає: {queryProps.totalPrice} грн.</p>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
