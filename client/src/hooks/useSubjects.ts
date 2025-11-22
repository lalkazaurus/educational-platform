import { useQuery } from "@tanstack/react-query"
import { findSubjectsByCategory } from "../api/subject.api"

export const useSubjects = (category: string) => {
    return useQuery({
        queryKey: ["subjectByCategory", category],
        queryFn: ({ queryKey }) => findSubjectsByCategory(queryKey[1]),
        enabled: !!category
    })
}