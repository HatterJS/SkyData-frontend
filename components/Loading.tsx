import styles from '@/styles/Home.module.scss';
import { loadingSVG } from '@/static/svgSprite';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      {loadingSVG}
      <p>SkyData</p>
    </div>
  );
};

export default Loading;
