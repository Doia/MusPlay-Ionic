import { User } from "./user";

export class AppComment {
    id?: number;
    owner?: User;
    content?: string;
    date?: string;
}