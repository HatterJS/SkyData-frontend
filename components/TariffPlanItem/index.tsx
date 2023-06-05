import styles from './TariffPlanItem.module.scss';
import Image from 'next/image';

interface Props {
  tariff: string;
}
interface Tariffs {
  [key: string]: {
    name: string;
    image: string;
    conditions: string[];
    price: string;
  };
}

const TariffPlanItem: React.FC<Props> = ({ tariff }) => {
  const tariffs: Tariffs = {
    start: {
      name: 'Старт',
      image: '/img/startPlane.png',
      conditions: ['Хмаринка розміром 1Гб.', 'Доступ з усіх пристроїв.'],
      price: 'БЕЗКОШТОВНО',
    },
    standart: {
      name: 'Стандарт',
      image: '/img/standartPlane.png',
      conditions: [
        'Хмаринка розміром 15Гб.',
        'Цілодобова підтримка.',
        'Доступ з усіх пристроїв.',
      ],
      price: '50 грн. / міс.',
    },
    maximum: {
      name: 'Максимум',
      image: '/img/maximumPlane.png',
      conditions: [
        'Хмаринка розміром 50Гб.',
        'Цілодобова підтримка.',
        'Доступ з усіх пристроїв.',
      ],
      price: '250 грн. / міс.',
    },
    enterprise: {
      name: 'Корпорація',
      image: '/img/corporationPlane.png',
      conditions: [
        'Хмаринка розміром 500Гб.',
        'Можливість ділитись файлами.',
        'Цілодобова підтримка.',
        'Доступ з усіх пристроїв.',
      ],
      price: '500 грн. / міс.',
    },
  };
  const currentTariff = tariffs[tariff];
  return (
    <div className={styles.paidServiceItem}>
      <Image src={currentTariff.image} alt={tariff} width={130} height={75} />
      <h3>{currentTariff.name}</h3>
      <ul>
        {currentTariff.conditions.map((condition) => (
          <li key={condition}>{condition}</li>
        ))}
      </ul>
      <h4>{currentTariff.price}</h4>
    </div>
  );
};

export default TariffPlanItem;
