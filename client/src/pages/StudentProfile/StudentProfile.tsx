import { useQuery } from "@tanstack/react-query"
import Spinner from "../../layouts/Spinner/Spinner"
import styles from "./StudentProfile.module.css"
import { useTranslation } from "react-i18next"
import type { AxiosError } from "axios"
import ErrorMessage from "../../layouts/ErrorMessage/ErrorMessage"
import type { ApiError } from "../../types/api"
import type { InitialStudentsDto } from "../../types/students.dto"
import { findStudentByUserId } from "../../api/students.api"
import { formatDateWithoutTime } from "../../format/date.format"

export default function StudentProfile() {
    const { 
        isLoading, 
        data, 
        isError, 
        error
    } = useQuery<InitialStudentsDto, AxiosError<ApiError>>({
        queryKey: ["findStudentById"],
        queryFn: () => findStudentByUserId()
    })

    const { t } = useTranslation("category")

    if (isError) return <div><ErrorMessage error={error}/></div>

    if (isLoading) return <Spinner/>

    return <div className={"container"}>
        <table className={styles.info}>
            <thead>
                <tr>
                    <td className={styles.title} colSpan={2}><span>{data?.fullName}</span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.field}>{t("learning-goal")}</td>
                    <td className={styles.valueCell}>{data?.learningGoal}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("date-of-birth")}</td>
                    <td className={styles.valueCell}>{formatDateWithoutTime(data!.dateOfBirth)}</td>
                </tr>
            </tbody>
        </table>
    </div>
}