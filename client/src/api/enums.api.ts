import api from "."

export const getCategories = async (): Promise<string[]> => {
    const response = await api.get<string[]>("/categories")
    return response.data
} 

export const getLevels = async (): Promise<string[]> => {
    const response = await api.get<string[]>("/levels")
    return response.data
}