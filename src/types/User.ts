export type UserRole = 'admin' | 'agent' | 'customer';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole | string;
    created_at: string;
}