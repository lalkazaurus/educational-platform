import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Main.module.css"

export default function Main() {
    const { t } = useTranslation()

    return <div className="container">
        <p>{t("hello_world")}</p>
        <Link to={"/ewefw"}>Crush me</Link>
    </div>
}