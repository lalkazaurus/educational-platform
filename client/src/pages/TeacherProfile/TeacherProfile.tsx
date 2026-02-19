import { useQuery } from "@tanstack/react-query";
import styles from "./TeacherProfile.module.css"
import type { TeacherProfileDto } from "../../types/teacher-profile.dto";
import type { ApiError } from "../../types/api";
import type { AxiosError } from "axios";
import { findTeacherByUserId } from "../../api/teacher-profile.api";
import Spinner from "../../layouts/Spinner/Spinner";
import ErrorMessage from "../../layouts/ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";

export default function TeacherProfile() {
    const { t } = useTranslation("category")
    const { 
        data, 
        isLoading, 
        isError,
        error
    } = useQuery<TeacherProfileDto, AxiosError<ApiError>>({
        queryKey: ["findTeacherByUserId"],
        queryFn: () => findTeacherByUserId()
    })

    if (isError) return <ErrorMessage error={error}/>

    if (isLoading) return <Spinner/>

    return <div className="container">
        <table className={styles.info}>
            <thead>
                <tr>
                    <td className={styles.title} colSpan={2}><span>{data?.fullName}</span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.field}>{t("biography")}:</td>
                    <td className={styles.valueCell}>{data?.bio}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("degree")}: </td>
                    <td className={styles.valueCell}>{data?.degree}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("experience")}: </td>
                    <td className={styles.valueCell}>{data?.experience}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("languages")}: </td>
                    <td className={styles.valueCell}>{data?.languages.join(", ")}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("levels")}: </td>
                    <td className={styles.valueCell}>{data?.levels.join(", ")}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("rating")}: </td>
                    <td className={styles.valueCell}>{data?.rating}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("pricePerHour")}: </td>
                    <td className={styles.valueCell}>{data?.pricePerHour}</td>
                </tr>
            </tbody>
        </table>
        <a className={styles.editProfile} href="/edit-teacher-profile">{t("edit-teacher-profile")}</a>
    </div>
}