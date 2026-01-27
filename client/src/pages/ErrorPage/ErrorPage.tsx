import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css"
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
    const { t } = useTranslation("main")

    return <div className="container">
        <div className={styles.errorBlock}>
            <p>{t("404-title")}</p>
            <div><Link to={"/"}>{t("404-home-link")}</Link></div>
        </div>
    </div>
}