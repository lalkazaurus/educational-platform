import api from "."
import type { AddSubjectDto, AvailableTimeDto, CreateTeacherDto, TeacherProfileDto } from "../types/teacher-profile.dto"

export const getAllTeachers = async () => {
    const { data } = await api.get("/teacher-profile")
    return data
}

export const createTeacherProfile = async (info: CreateTeacherDto) => {
    const formData = new FormData();

    formData.append("fullName", info.fullName);
    formData.append("bio", info.bio);
    formData.append("degree", info.degree);
    formData.append("experience", info.experience);
    formData.append("pricePerHour", info.pricePerHour.toString());

    if (info.image && info.image.length > 0) {
        formData.append("file", info.image[0]); 
    }
    
    const { data } = await api.post("/teacher-profile/create", formData);
    return data;
};

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

export const getTeachersProfilesBySubject = async (subjectName: string) => {
    const response = await api.get<TeacherProfileDto>(`teacher-profile/${subjectName}`)
    return response.data
}

export const findTeacherById = async (id: number) => {
    const reasponse = await api.get<TeacherProfileDto>(`teacher-profile/id/${id}`)
    return reasponse.data
}

export const findTeacherByUserId = async () => {
    const response = await api.get<TeacherProfileDto>(`teacher-profile/profile/by-user-id`)
    return response.data
}