import { ReactNode } from 'react';

export const formDate = (strDate: string): ReactNode => {
    const date = new Date(strDate);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
};
export const formSize = (size: number) => {
    const formatedSize = size / 10 ** 6;
    return formatedSize.toFixed(2);
};
export const formName = (fileName: string) => {
    const nameOnly = fileName.split('.')[0];
    const formatedName = nameOnly.length > 25 ? nameOnly.substring(0, 22) + '...' : nameOnly;
    return formatedName;
}