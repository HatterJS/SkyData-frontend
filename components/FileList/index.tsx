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
import { useEffect, useState } from 'react';
import { formDate, formName, formSize } from '@/utils/formFileData';

interface FileListProps {
  items: FileItem[];
}

export const FileList: React.FC<FileListProps> = ({ items }) => {
  const [viewStyle, setViewStyle] = useState<String>('card');
  // const [sortType, setSortType] = useState<String>('date');
  // items.sort(
  //   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  const handleViewStyle = (style: string) => {
    setViewStyle(style);
    localStorage.setItem('fileViewStyle', style);
  };

  useEffect(() => {
    setViewStyle(localStorage.getItem('fileViewStyle') ?? 'card');
  }, []);

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
            checked={viewStyle === 'card'}
            onChange={() => handleViewStyle('card')}
          />
          <label htmlFor='viewStyleCell' title='таблиця'>
            {cellsSVG}
          </label>
          <input
            type='radio'
            name='viewStyle'
            id='viewStyleList'
            checked={viewStyle === 'list'}
            onChange={() => handleViewStyle('list')}
          />
          <label htmlFor='viewStyleList' title='список'>
            {listSVG}
          </label>
        </div>
      </div>
      {viewStyle === 'card' ? (
        <div className={styles.fileListCard}>
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
      ) : (
        <div className={styles.fileListList}>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Ім&apos;я</th>
                <th>Тип</th>
                <th>
                  Розмір
                  <br />
                  МБ
                </th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{formName(item.originalName)}</td>
                  <td>{item.originalName.split('.').pop()}</td>
                  <td>{formSize(item.size)}</td>
                  <td>{formDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
