import { uploadSVG } from '@/static/svgSprite';
import { useRef } from 'react';
import { createTemporaryNotification } from '../message';
import * as Api from '@/api';

export const UploadButton: React.FC = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInput.current?.click();
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = await Api.files.uploadFile(e.target.files?.[0]);
      console.log(file);
      createTemporaryNotification(true, 'Файл завантажено');
    } catch (err) {
      createTemporaryNotification(false, 'Помилка завантаження');
    }
  };
  return (
    <div>
      <button onClick={handleUploadClick}>{uploadSVG}Завантажити файл</button>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileInputChange}
      />
    </div>
  );
};
