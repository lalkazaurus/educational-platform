import { useQuery } from "@tanstack/react-query"
import { findSubjectsByCategory, findSubjectsNames } from "../api/subject.api"

export const useSubjects = (category: string) => {
    return useQuery({
        queryKey: ["subjectByCategory", category],
        queryFn: ({ queryKey }) => findSubjectsByCategory(queryKey[1]),
        enabled: !!category
    })
}

export const useSubjectsNames = () => {
    return useQuery({
        queryKey: ["subjectsNames"],
        queryFn: findSubjectsNames
    })
}