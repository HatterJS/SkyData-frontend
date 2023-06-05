import { User } from "./auth.dto";

export interface FileItem {
    _id: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    user: User;
}