import { Extension } from "@/utils/colorByExtension";

export const getFileExtention = (filename: string) => {
    return filename.split('.').pop() as Extension;
}