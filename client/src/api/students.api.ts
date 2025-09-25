import api from "."

export const getAllStudents = async () => {
    const { data } = await api.get("/students")
    return data
}