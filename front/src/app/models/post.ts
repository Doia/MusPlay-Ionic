import {  User } from "./user";
import { AppComment, transformarAppComment } from "./comment";


export interface Post {
    id: number;
    owner: User;
    createdDate: Date;
    content: string;
    imagePath?: string;
    imageUrl?: string;
    likes: User[];
    comments?: AppComment[];
}

export function transformarPost(data: any): Post {
    return {
        id: data.id,
        owner: data.owner || {},
        createdDate: data.createdDate || new Date().toISOString(), // Valor por defecto si no hay fecha
        content: data.content || '', // Valor por defecto si no hay contenido
        imagePath: data.imagePath || '', // Valor por defecto si no hay imagen
        imageUrl: data.imageUrl || '', // Valor por defecto si no hay imagen
        likes: data.likes || [],
        comments: data.comments ? data.comments.map(transformarAppComment) : [], // Transformar comentarios si existen
    };
}
