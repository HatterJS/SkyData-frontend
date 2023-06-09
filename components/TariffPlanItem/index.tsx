import Link from 'next/link';
import styles from './TariffPlanItem.module.scss';
import Image from 'next/image';
import Loading from '../Loading';

interface Props {
  tariff: string;
  isActive: boolean;
}
interface Tariffs {
  [key: string]: {
    name: string;
    image: string;
    conditions: string[];
    price: string;
  };
}

const TariffPlanItem: React.FC<Props> = ({ tariff, isActive = false }) => {
  const tariffs: Tariffs = {
    start: {
      name: 'Старт',
      image: '/img/startPlane.png',
      conditions: ['Хмаринка розміром 10МБ.', 'Доступ з усіх пристроїв.'],
      price: 'БЕЗКОШТОВНО',
    },
    standart: {
      name: 'Стандарт',
      image: '/img/standartPlane.png',
      conditions: [
        'Хмаринка розміром 15ГБ.',
        'Цілодобова підтримка.',
        'Доступ з усіх пристроїв.',
      ],
      price: '50 грн. / міс.',
    },
    maximum: {
      name: 'Максимум',
      image: '/img/maximumPlane.png',
      conditions: [
        'Хмаринка розміром 50ГБ.',
        'Цілодобова підтримка.',
        'Доступ з усіх пристроїв.',
      ],
      price: '250 грн. / міс.',
    },
    enterprise: {
      name: 'Корпорація',
      image: '/img/corporationPlane.png',
      conditions: [
        'Хмаринка розміром 500ГБ.',
        'Можливість ділитись файлами.',
        'Цілодобова підтримка.',
        'Доступ з усіх пристроїв.',
      ],
      price: '500 грн. / міс.',
    },
  };
  const currentTariff = tariffs[tariff];
  if (!currentTariff) return <Loading />;
  return (
    <Link
      href={{ pathname: `/profile/tariff/order`, query: { tariff } }}
      className={
        isActive ? styles.paidServiceItem : styles.paidServiceItemDisabled
      }
    >
      <div className={styles.imageBlock}>
        <Image src={currentTariff.image} alt={tariff} width={130} height={75} />
        <h3>{currentTariff.name}</h3>
      </div>
      <div className={styles.descriptionBlock}>
        <ul>
          {currentTariff.conditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
        <h4>{currentTariff.price}</h4>
      </div>
    </Link>
  );
};

export default TariffPlanItem;
