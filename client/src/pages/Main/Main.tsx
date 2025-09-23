import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import Spinner from "../../layouts/Spinner/Spinner";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Main() {
    const { t } = useTranslation()
    const {data, isLoading, isError} = useUsers()

    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <ErrorPage/>
    }

    console.log(data)

    return <>
        <p>{t("hello_world")}</p>
        <Link to={"/ewefw"}>Crush me</Link>
    </>
}