import { AppComment, transformarAppComment } from "./comment";
import { Post, transformarPost } from "./post";
import { User } from "./user";

export interface NotificationModel {
    id: number;
    message: string;
    type: string;
    comment?: AppComment;
    sender: User;
    receiver: User;
    post?: Post;
    createdAt: Date;
    followRequest?: {
        id: number;
        sender: User;
    };
    isRead: boolean;
}

// export class NotificationModel {
//     id?: number;
//     message?: string;
//     type?: string;
//     comment?: AppComment;
//     sender?: User;
//     receiver?: User;
//     post?: Post; 
//     createdAt?: Date;
//     followRequest?: {
//         id?: number;
//         sender?: User;
//     };
//     isRead?: boolean;
// }

export function transformarNotificationModel(data: any): NotificationModel {
    return {
        id: data.id,
        message: data.message || 'No message', // Valor por defecto
        type: data.type || 'info', // Valor por defecto
        comment: data.comment ? transformarAppComment(data.comment) : undefined, // Transformar si existe
        sender: new User(data.sender),
        receiver: new User(data.receiver),
        post: data.post ? transformarPost(data.post) : undefined, // Transformar si existe
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(), // Valor por defecto si no hay fecha
        followRequest: data.followRequest ? {
            id: data.followRequest.id,
            sender: new User(data.followRequest.sender)
        } : undefined,
        isRead: data.isRead !== undefined ? data.isRead : false, // Valor por defecto
    };
}

