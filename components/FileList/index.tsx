import styles from './FileList.module.scss';
import FileCard from '../FileCard';
import { FileItem } from '@/api/dto/files.dto';
import {
  cellsSVG,
  listSVG,
  sortDateSVG,
  sortNameSVG,
  sortSizeSVG,
} from '@/static/svgSprite';

interface FileListProps {
  items: FileItem[];
}

export const FileList: React.FC<FileListProps> = ({ items }) => {
  console.log(items[0].createdAt);
  return (
    <div className={styles.root}>
      <div className={styles.toolBar}>
        <div className={styles.sortTools}>
          <p>Сортування:</p>
          <input type='radio' name='sorting' id='sortingName' />
          <label htmlFor='sortingName' title="за ім'ям">
            {sortNameSVG}
          </label>
          <input type='radio' name='sorting' id='sortingSize' />
          <label htmlFor='sortingSize' title='за розміром'>
            {sortSizeSVG}
          </label>
          <input type='radio' name='sorting' id='sortingDate' defaultChecked />
          <label htmlFor='sortingDate' title='за датою'>
            {sortDateSVG}
          </label>
        </div>
        <div className={styles.viewTools}>
          <p>Стиль:</p>
          <input
            type='radio'
            name='viewStyle'
            id='viewStyleCell'
            defaultChecked
          />
          <label htmlFor='viewStyleCell' title='таблиця'>
            {cellsSVG}
          </label>
          <input type='radio' name='viewStyle' id='viewStyleList' />
          <label htmlFor='viewStyleList' title='список'>
            {listSVG}
          </label>
        </div>
      </div>
      <div className={styles.fileList}>
        {items.map((item) => (
          <div key={item._id} className='file'>
            <FileCard
              filename={item.filename}
              originalName={item.originalName}
              _id={item._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
