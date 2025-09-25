import api from "."
import type { LoginDto, RegisterDto } from "../types/login.dto"

export const login = async (user: LoginDto) => {
    const { data } = await api.post("auth/login", user)
    return data
}

export const register = async (user: RegisterDto) => {
    const { data } = await api.post("auth/register", user)
    return data
}