export interface User {
    id: number,
    username: string,
    email: string,
    roles: string[],
    status: string,
    lastLogin: Date,
    phoneNumber: string,
    tokens: string[];
}