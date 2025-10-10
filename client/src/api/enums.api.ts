import api from "."

export const getCategories = async (): Promise<string[]> => {
    const response = await api.get<string[]>("/categories")
    return response.data
} 

export const getLevels = async () => {
    const data = await api.get("levels")
    return data
}