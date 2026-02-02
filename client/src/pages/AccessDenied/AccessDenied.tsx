import { Link } from "react-router-dom";
import styles from "./AccessDenied.module.css"
import { useTranslation } from "react-i18next";

export default function AccessDenied() {
    const { t } = useTranslation("main")

    return <div className="container">
        <div className={styles.errorBlock}>
            <p>{t("403-title")}</p>
            <div><Link to={"/"}>{t("403-home-link")}</Link></div>
        </div>
    </div>
}