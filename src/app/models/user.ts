export interface User {
    _id: number;
    email: string;
    password: string;
    role: string; // ENUM: admin, user
    firstName: string;
    lastName: string;
}
