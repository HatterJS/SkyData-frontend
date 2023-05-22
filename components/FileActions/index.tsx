import styles from './FileActions.module.scss';
import { createTemporaryNotification } from '../message';
import { deleteSVG, downloadSVG, shareSVG } from '@/static/svgSprite';
import * as Api from '@/api';

interface FileActionsProps {
  filename: string;
  _id: string;
}

export const FileActions: React.FC<FileActionsProps> = ({ filename, _id }) => {
  const handleDownloadClick = () => {
    const fileUrl = `http://localhost:7777/uploads/${filename}`;
    window.open(fileUrl, '_blank');
  };

  const handleDeleteClick = async () => {
    try {
      console.log(_id);
      await Api.files.remove(_id);
      window.location.reload();
    } catch (err) {
      createTemporaryNotification(false, 'Помилка видалення');
    }
  };

  const handleShareClick = () => {
    createTemporaryNotification(true, 'Функція не доступна');
  };

  return (
    <div className={styles.root}>
      <button onClick={handleDownloadClick}>{downloadSVG}</button>
      <button onClick={handleShareClick} disabled>
        {shareSVG}
      </button>
      <button onClick={handleDeleteClick}>{deleteSVG}</button>
    </div>
  );
};
