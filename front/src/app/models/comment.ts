import { User } from "./user";


export interface AppComment {
    id: number;
    owner: User;
    content: string;
    createdAt: Date;
}


export function transformarAppComment(data: any): AppComment {
    return {
        id: data.id,
        owner: data.owner || {},
        content: data.content || '', // Valor por defecto si no hay contenido
        createdAt: data.date || new Date().toISOString(), // Valor por defecto si no hay fecha
    };
}
