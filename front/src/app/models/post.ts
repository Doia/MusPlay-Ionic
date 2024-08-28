import { transformarUser, User } from "./user";
import { AppComment, transformarAppComment } from "./comment";


export interface Post {
    id: number;
    title?: string;
    owner: User;
    date: string;
    content: string;
    imagePath?: string;
    comments?: AppComment[];
}

// export class Post {
//     id?: number;
//     title?: string;
//     owner?: User;
//     date?: string;
//     content?: string;
//     imagePath?: string;
//     comments?: AppComment[]
// }

export function transformarPost(data: any): Post {
    return {
        id: data.id,
        title: data.title || 'Untitled', // Valor por defecto si no hay título
        owner: transformarUser(data.owner),
        date: data.date || new Date().toISOString(), // Valor por defecto si no hay fecha
        content: data.content || '', // Valor por defecto si no hay contenido
        imagePath: data.imagePath || '', // Valor por defecto si no hay imagen
        comments: data.comments ? data.comments.map(transformarAppComment) : [], // Transformar comentarios si existen
    };
}
