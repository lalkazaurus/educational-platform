import api from "."
import type { AddSubjectDto, AvailableTimeDto, TeacherProfileDto } from "../types/teacher-profile.dto"

export const getAllTeachers = async () => {
    const { data } = await api.get("/teacher-profile")
    return data
}

export const createTeacherProfile = async (info: TeacherProfileDto) => {
    const data = await api.post("/teacher-profile/create", info)
    return data
}

export const updateTeacherProfile = async (info: TeacherProfileDto) => {
    const data = await api.patch("/teacher-profile/update", info)
    return data
}

export const deleteTeacherProfile = async () => {
    const { data } = await api.delete("/teacher-profile/delete")
    return data
}

export const addTimeToTeacherProfile = async (time: AvailableTimeDto) => {
    const { data } = await api.post("teacher-profile/add-available-time", time)
    return data
}

export const removeTimeFromTeacherProfile = async (time: AvailableTimeDto) => {
    const { data } = await api.patch("teacher-profile/remove-available-time", time)
    return data
}

export const addSubjectToTeacherProfile = async (subject: AddSubjectDto) => {
    const { data } = await api.post("teacher-profile/add-subject", subject)
    return data
}

export const removeSubjectFromTeacherProfile = async (time: AvailableTimeDto) => {
    const { data } = await api.patch("teacher-profile/remove-subject", time)
    return data
}

export const addLanguagesToTeacherProfile = async (languages: AvailableTimeDto) => {
    const { data } = await api.post("teacher-profile/add-languages", languages)
    return data
}

export const removeLanguagesFromTeacherProfile = async (languages: AvailableTimeDto) => {
    const { data } = await api.patch("teacher-profile/remove-languages", languages)
    return data
}