import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Spinner from "../../layouts/Spinner/Spinner"
import { findTeacherById } from "../../api/teacher-profile.api"
import styles from "./TeacherPage.module.css"
import { useTranslation } from "react-i18next"

export default function TeacherPage() {
    const { id } = useParams()

    const { isLoading, data} = useQuery({
        queryKey: ["findTeacherById", id],
        queryFn: () => findTeacherById(+id!),
        enabled: !!id
    })

    const { t } = useTranslation("category")

    if (isLoading) return <Spinner/>

    return <div className={"container"}>
        <table className={styles.info}>
            <thead>
                <tr>
                    <td className={styles.title} colSpan={2}>{data?.fullName}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.field}>{t("biography")}:</td>
                    <td>{data?.bio}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("degree")}: </td>
                    <td>{data?.degree}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("experience")}: </td>
                    <td>{data?.experience}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("languages")}: </td>
                    <td>{data?.languages.join(", ")}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("levels")}: </td>
                    <td>{data?.levels.join(", ")}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("rating")}: </td>
                    <td>{data?.rating}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("pricePerHour")}: </td>
                    <td>{data?.pricePerHour}</td>
                </tr>
            </tbody>
        </table>
    </div>
}