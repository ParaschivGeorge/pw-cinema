export interface User {
    id: number;
    email: string;
    password: string;
    role: string; // ENUM: admin, user
    firstName: string;
    lastName: string;
}
