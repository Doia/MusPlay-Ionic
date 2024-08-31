

export interface Role {
    id: number;
    name: string;
}

export function transformarRole(data: any): Role {
    return {
        id: data.id,
        name: data.name || 'User', // Valor por defecto si no hay nombre
    };
}
