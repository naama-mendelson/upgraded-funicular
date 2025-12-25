export  interface AuthFormInputs{
    name?: string;
    email: string;
    password: string;
}
export interface UserProps{
    username: string;
    id: string;
    name: string;
    email: string;
    role: Role;
    created_at: Date;
}
export type Role = "customer" | "agent" | "admin"; 

export interface UserCreate {
    name: string;      
    email: string;    
    password: string;  
    role: 'admin' | 'agent' | 'customer'; 
}