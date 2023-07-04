import { uploadSVG } from '@/static/svgSprite';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { createTemporaryNotification } from '../message';
import * as Api from '@/api';
import { AxiosError } from 'axios';

interface UploadButtonProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ setIsLoading }) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInput.current?.click();
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    //check file size limit
    if (e.target.files && e.target.files[0].size > 10 * 10 ** 6) {
      createTemporaryNotification(false, 'Файл не може перевищувати 10МБ');
      return;
    }
    try {
      const userData = await Api.auth.getMe();
      //check total size limit
      if (
        e.target.files &&
        e.target.files[0].size + userData.usedSpace.total >
          userData.maxSize * 10 ** 6
      ) {
        createTemporaryNotification(
          false,
          'Ви перевищили загальний обсяг хмарки'
        );
        return;
      }

      setIsLoading(true);
      await Api.files.uploadFile(e.target.files?.[0]);
      window.location.reload();
      setIsLoading(false);
    } catch (err: AxiosError | any) {
      createTemporaryNotification(
        false,
        err?.response?.data?.message || 'Помилка завантаження'
      );
      setIsLoading(false);
    }
  };
  return (
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
