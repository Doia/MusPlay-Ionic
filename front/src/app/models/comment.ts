import { transformarUser, User } from "./user";


export interface AppComment {
    id: number;
    owner: User;
    content: string;
    date: string;
}

// export class AppComment {
//     id?: number;
//     owner?: User;
//     content?: string;
//     date?: string;
// }

export function transformarAppComment(data: any): AppComment {
    return {
        id: data.id,
        owner: transformarUser(data.owner),
        content: data.content || '', // Valor por defecto si no hay contenido
        date: data.date || new Date().toISOString(), // Valor por defecto si no hay fecha
    };
}
