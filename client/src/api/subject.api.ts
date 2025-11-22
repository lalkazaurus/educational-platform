import api from "."
import type { DeleteSubjectDto, InitialSubjectDto } from "../types/subject.dto"

export const getAllSubjects = async () => {
    const { data } = await api.get("/")
    return data
}

export const createSubject = async (subject: InitialSubjectDto) => {
    const { data } = await api.post("/subject/create", subject)
    return data
}

export const updateSubject = async (subject: InitialSubjectDto) => {
    const { data } = await api.patch("/subject/update", subject)
    return data
}

export const deleteSubject = async (name: DeleteSubjectDto) => {
    const { data } = await api.patch("/subject/delete", name)
    return data
}

export const findSubjectsByCategory = async (category: string) => {
    const response = await api.get<InitialSubjectDto[]>(`/subject/${category}`)
    return response.data
}