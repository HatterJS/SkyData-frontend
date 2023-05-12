import { User } from "./auth.dto";

export interface FileItem {
    _id: number;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    user: User;
}