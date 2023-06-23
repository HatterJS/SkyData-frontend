export const isImage = (ext: string): boolean => {
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(ext.toLowerCase());
}
export const isAudio = (ext: string): boolean => {
    return ['mp3', 'wav', 'm4a', 'flac', 'wma', 'aac', 'au', 'mid', 'midi'].includes(ext.toLowerCase());
}
export const isVideo = (ext: string): boolean => {
    return ['mp4', 'm4v', 'mov', 'wmv', 'flv', 'avi', 'mkv', 'avchd', 'mpg', 'mpeg', 'asf'].includes(ext.toLowerCase());
}