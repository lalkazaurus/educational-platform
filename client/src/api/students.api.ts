import api from "."
import type { InitialStudentsDto } from "../types/students.dto"

export const getAllStudents = async () => {
    const { data } = await api.get("/students")
    return data
}

export const createStudent = async (student: InitialStudentsDto) => {
    const { data } = await api.post("/students/create", student)
    return data
}

export const updateStudent = async (student: InitialStudentsDto) => {
    const { data } = await api.patch("/students/update", student)
    return data
}

export const deleteStudent = async () => {
    const { data } = await api.delete("/students/delete")
    return data
}