import { useQuery } from "@tanstack/react-query"
import { getTeachersProfilesBySubject } from "../api/teacher-profile.api"

export const useTeacherProfile = (subject: string) => {
    return useQuery({
        queryKey: ["TeachersBySubject", subject],
        queryFn: ({ queryKey }) => getTeachersProfilesBySubject(queryKey[1]),
        enabled: !!subject
    }) 
}