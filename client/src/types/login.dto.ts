export interface LoginDto {
    email: string,
    password: string
}

export interface RegisterDto extends LoginDto {
    username: string,
    phoneNumber: string
}