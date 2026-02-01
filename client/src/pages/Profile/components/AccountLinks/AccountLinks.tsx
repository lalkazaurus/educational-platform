import { useTranslation } from "react-i18next"
import styles from "./AccountLinks.module.css"

interface AccountLinksProps {
    roles: string[]
}

export default function AccountLinks({ roles }: AccountLinksProps) {
    const { t } = useTranslation("profile")

    if (roles.includes("TEACHER") && roles.includes("STUDENT")) {
        return <div className={styles.doubleRoles}>
            <a className={styles.teacherLink} href="/teacher-profile">{t("check-teacher")}</a>
            <a className={styles.studentLink} href="/student-profile">{t("check-student")}</a>
        </div>
    } else if (roles.includes("TEACHER")) {
        return <div className={styles.teacherRole}>
            <a href="/teacher-profile">{t("check-teacher")}</a>
        </div>
    } else if (roles.includes("STUDENT")) {
        return <div className={styles.studentRole}>
            <a href="/student-profile">{t("check-student")}</a>
        </div>
    } 
    return <></>
}