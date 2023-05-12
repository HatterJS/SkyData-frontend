export const isImage = (ext: string): boolean => {
    return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
}