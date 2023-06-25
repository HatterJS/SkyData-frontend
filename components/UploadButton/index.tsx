import { uploadSVG } from '@/static/svgSprite';
import { useRef, useState } from 'react';
import { createTemporaryNotification } from '../message';
import * as Api from '@/api';
import Loading from '../Loading';

export const UploadButton: React.FC = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = () => {
    fileInput.current?.click();
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    console.log(isLoading);
    try {
      await Api.files.uploadFile(e.target.files?.[0]);
      window.location.reload();
      setIsLoading(false);
      console.log(isLoading);
    } catch (err) {
      createTemporaryNotification(false, 'Помилка завантаження');
      setIsLoading(false);
      console.log(isLoading);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <button onClick={handleUploadClick}>
        {uploadSVG}
        <p>Завантажити</p>
      </button>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileInputChange}
      />
    </div>
  );
};
