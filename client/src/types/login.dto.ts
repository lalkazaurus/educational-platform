export interface LoginDto {
    email: string,
    password: string
}

export interface RegisterDto extends LoginDto {
    username: string,
    phoneNumber: string
}

export interface ChangePasswordDto {
    email: string;
    password: string;
    newPassword: string;
    passwordRepeat: string;
}

export interface ChangePasswordData {
    email: string;
    password: string;
    newPassword: string;
}