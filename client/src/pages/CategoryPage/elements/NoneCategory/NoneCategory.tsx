import { Link } from "react-router-dom";
import styles from "./NoneCategory.module.css";
import { useTranslation } from "react-i18next";

export default function NoneCategory() {
    const { t } = useTranslation("category")

    return (
        <div className="container">
            <div className={styles.errorBlock}>
                <h1>{t("title")}</h1>
                <h2>{t("subtitle")}</h2>
                <Link to="/">{t("back")}</Link>
            </div>
        </div>
    );
}
