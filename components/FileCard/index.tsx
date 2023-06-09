import styles from './FileCard.module.scss';
import React from 'react';
import { getFileExtention } from '@/utils/getFileExtensin';
import { isAudio, isImage, isVideo } from '@/utils/fileType';
import { colorByExtention } from '@/utils/colorByExtension';
import { audioFileSVG, noImageSVG } from '@/static/svgSprite';
import { shortFileName } from '@/utils/formFileName';
import { FileActions } from '../FileActions';

interface FileCardProps {
  filename: string;
  originalName: string;
  _id: string;
}

const FileCard: React.FC<FileCardProps> = ({ originalName, filename, _id }) => {
  const ext = getFileExtention(filename);
  const previewUrl =
    ext && (isImage(ext) || isVideo(ext))
      ? `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_NAME}/uploads/` +
        filename
      : '';
  const color = colorByExtention(ext);
  const [formName, setFormName] = React.useState(originalName);

  React.useEffect(() => {
    if (originalName.split('.')[0].length > 30)
      setFormName(shortFileName(originalName));
  }, [originalName]);

  return (
    <div className={styles.root}>
      {isImage(ext) ? (
        <div className={styles.imageCover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.image} src={previewUrl} alt='file' />
        </div>
      ) : isAudio(ext) ? (
        <div className={styles.fileCover}>
          <b style={{ backgroundColor: color }}>{ext}</b>
          {audioFileSVG}
        </div>
      ) : isVideo(ext) ? (
        <div className={styles.imageCover}>
          <video className={styles.image} src={previewUrl} />
          {/* <b style={{ backgroundColor: color }}>{ext}</b>
          {videoFileSvg} */}
        </div>
      ) : (
        <div className={styles.fileCover}>
          <b style={{ backgroundColor: color }}>{ext}</b>
          {noImageSVG}
        </div>
      )}
      <div className={styles.fileActions}>
        <FileActions _id={_id} filename={filename} />
      </div>
      <span className={styles.fileName}>{formName}</span>
    </div>
  );
};

export default FileCard;
