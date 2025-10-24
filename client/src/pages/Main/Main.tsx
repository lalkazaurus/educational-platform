import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Main.module.css"
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../layouts/Spinner/Spinner";
import { getCategories } from "../../api/enums.api";

export default function Main() {
    const { t } = useTranslation("main")
    const { data, isLoading } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    })

    if (isLoading) return <Spinner/>

    return <div className="container">
        <div className={styles.main}>
            <div className={styles.info}>
                <h1>{t("title")}</h1>
                <div className={styles.linkBlock}>
                    <span>{t("subtitle")}</span>
                    <Link to={"/subjects"}>{t("cta")}</Link>
                </div>
            </div>
            <div>
                <img src="/main-humans.png"/>
            </div>
        </div>
        <div className={styles.categoriesBlock}>
            <span>
                <h1>{t("categories")}</h1>
            </span>
            <div className={styles.titlesBlock}>
                {data?.map((category) => 
                    <Link to={`/category/${category.toLowerCase()}`}>
                        <div className={styles.category}>
                            {category.split("_").join(" ")}
                        </div>
                    </Link>
                )}
            </div>
        </div>
        <div className={styles.bestWorker}>
            <div className={styles.imageContainer}>
                <img src="../../../public/teacher.jpg"></img>
            </div>
            <div className={styles.teacherAbout}>
                <h2>{t("specialists")}</h2>
                <span>{t("fullname")}</span>
                <span>{t("subject")}</span>
                <span>{t("experience")}</span>
            </div>
        </div>
        <div className={styles.conclusionBlock}>
            <h1>{t("inspiration")}</h1>
            <h2>{t("sub_inspiration")}</h2>
            <Link to={"/login"}>{t("join_button")}</Link>
        </div>
    </div>
}