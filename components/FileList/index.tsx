import styles from './FileList.module.scss';
import FileCard from '../FileCard';
import { FileItem } from '@/api/dto/files.dto';

interface FileListProps {
  items: FileItem[];
}

export const FileList: React.FC<FileListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div key={item._id} className='file'>
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}
    </div>
  );
};
