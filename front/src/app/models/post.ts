import { User } from "./user";
import { AppComment } from "./comment";

export class Post {
    id?: number;
    title?: string;
    owner?: User;
    date?: string;
    content?: string;
    imagePath?: string;
    comments?: AppComment[]
}