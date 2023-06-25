import axios from '@/core/axios';
import { FileItem } from './dto/files.dto';

type FileType = 'all' | 'photos' | 'videos' | 'audios' | 'docs';

export const getAll = async (type: FileType = 'all'): Promise<FileItem[]> => {
    return (await axios.get('/files?type=' + type)).data;
};

export const remove = (id: string): Promise<void> => {
    return axios.delete('/files?id=' + id);
};

export const uploadFile = async (file: any) => {
    if (file.size > 10000000) {
        alert('Розмір файлу перевищує 10МБ');
        throw new Error;
    }

    const formData = new FormData();
    formData.append('file', file);

    // const config = {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // };

    const { data } = await axios.post('/files', formData,
        // config
    );
    return data;
};
