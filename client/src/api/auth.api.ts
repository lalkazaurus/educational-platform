import api from "."
import type { LoginDto, RegisterDto } from "../types/login.dto"

export const login = async (user: LoginDto) => {
    const { data } = await api.post("auth/login", user)
    return data
}

export const registerUser = async (user: RegisterDto) => {
    const { data } = await api.post("auth/register", user)
    return data
}

export const status = async () => {
    const { data } = await api.get("auth/status")
    return data
}

export const logout = async () => {
    const { data } = await api.delete("auth/logout")
    return data
}

export const refresh = async () => {
    const { data } = await api.post("auth/refresh")
    return data
}

export const addNewTeacher = async (id: number) => {
    const { data } = await api.get(`add-new-teacher/:${id}`)
    return data
}
