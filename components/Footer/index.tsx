import styles from './Footer.module.scss';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.cover}>
        <p>©2023&nbsp;SkyData</p>
        <Link href={'/'}>Головна</Link>
        <Link href={'/about'}>Про&nbsp;нас</Link>
        <Link href={'/privacypolicy'}>Privacy</Link>
        <Link href={'/agreement'}>Terms</Link>
        <Link href={'/contacts'}>Контакти</Link>
        <p>
          Розроблено:&nbsp;
          <a href='https://www.instagram.com/mr.hatter.photo' target='_blank'>
            mr.Hatter
          </a>
        </p>
      </div>
    </footer>
  );
};
