import { PrivacyLevel } from "./PrivacyLevel";
import { Role, transformarRole } from "./role";


export interface User {
    id: string;
    username: string;
    password?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    roles?: Role[];
    token?: string;
    friends?: string[];
    enabled?: boolean;
    admin?: boolean;
    privacyLevel?: PrivacyLevel;
    friendsCount?: number;
    matchCount?: number;
    imagePath?: string;
    privacyData?: PrivacyLevel;
}

// export class User {

//     privacyData?: PrivacyLevel;
//     id?: string;
//     username?: string;
//     email?: String;
//     password?: string;
//     phone?: string;
//     firstName?: string;
//     lastName?: string;
//     description?: string
//     roles?: Role[];
//     token?: string;
//     friends?: string[];
//     enabled?: boolean;
//     admin?: boolean;
//     privacyLevel?: PrivacyLevel;
//     friendsCount?: number;
//     matchCount?: number;
//     imagePath?: string;
// }

export function transformarUser(data: any): User {
    return {
        id: data.id,
        username: data.username || 'Anonymous', // Valor por defecto si no hay nombre de usuario
        password: data.password || '',
        email: data.email || '', // Valor por defecto si no hay email
        phone: data.phone || '', // Valor por defecto si no hay teléfono
        firstName: data.firstName || '', // Valor por defecto si no hay nombre
        lastName: data.lastName || '', // Valor por defecto si no hay apellido
        description: data.description || '', // Valor por defecto si no hay descripción
        roles: data.roles ? data.roles.map(transformarRole) : [], // Transformar roles si existen
        token: data.token || '', // Valor por defecto si no hay token
        friends: data.friends || [], // Valor por defecto si no hay amigos
        enabled: data.enabled !== undefined ? data.enabled : true, // Valor por defecto
        admin: data.admin !== undefined ? data.admin : false, // Valor por defecto
        privacyLevel: data.privacyLevel || undefined, // Mantener undefined si no existe
        friendsCount: data.friendsCount || 0, // Valor por defecto si no hay contador de amigos
        matchCount: data.matchCount || 0, // Valor por defecto si no hay contador de coincidencias
        imagePath: data.imagePath || '', // Valor por defecto si no hay imagen
        privacyData: data.privacyData || undefined, // Mantener undefined si no existe
    };
}

