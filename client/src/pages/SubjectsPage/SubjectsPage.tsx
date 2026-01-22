import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import type { TeacherProfileDto } from "../../types/teacher-profile.dto"
import { findTeachersBySubjectName } from "../../api/subject.api"
import Spinner from "../../layouts/Spinner/Spinner"
import styles from "./SubjectsPage.module.css"
import { useTranslation } from "react-i18next"

export default function SubjectsPage() {
    const { subject } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const colors = ["#b39ddb", "#fff176", "#FFA8A5"]
    const { t } = useTranslation("category")

    useEffect(() => {
        if (!subject) {
            navigate('/')
        }
    }, [subject, navigate])

    const { data, isLoading } = useQuery<TeacherProfileDto[]>({
        queryKey: ['teachersBySubjectName', subject],
        queryFn: () => findTeachersBySubjectName(subject!),
        enabled: !!subject,
    })

    if (isLoading) return <Spinner/>

    return (
        <div className="container">
            {data?.map((teacher, index) => 
                <div 
                    key={teacher.id} 
                    style={{ backgroundColor: colors[index % 3] }} 
                    className={(index % 2 === 0) ? styles.worker : styles.reverseWorker}
                    onClick={() => navigate(`${location.pathname}/teacher/${teacher.id}`)}
                >
                    <div className={styles.imageContainer}>
                        <img src="../../../public/teacher.png"></img>
                    </div>
                    <div className={styles.teacherAbout}>
                        <h2>{`${teacher.fullName}`}</h2>
                        <span>{`${t("biography")}: ${teacher.bio}`}</span>
                        <span>{`${t("experience")}: ${teacher.experience}`}</span>
                        <span>{`${t("degree")}: ${teacher.degree}`}</span>
                        <span>{`${t("pricePerHour")}: ${teacher.pricePerHour}`}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
