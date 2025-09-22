import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Main() {
    const { t } = useTranslation()

    return <>
        <p>{t("hello_world")}</p>
        <Link to={"/ewefw"}>Crush me</Link>
    </>
}