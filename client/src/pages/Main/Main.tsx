import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Main.module.css"
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../layouts/Spinner/Spinner";
import { getCategories } from "../../api/enums.api";

export default function Main() {
    const { t } = useTranslation()
    const { data, isLoading } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    })

    console.log(data)

    if (isLoading) return <Spinner/>

    return <div className="container">
        <div className={styles.main}>
            <div className={styles.info}>
                <h1>Сьогодні — знання. Завтра — можливості.</h1>
                <div className={styles.linkBlock}>
                    <span>Не відкладайте свій успіх на завтра. Навчання — це інвестиція, яка окупиться першою. Зробіть перший крок до нової кар'єри прямо зараз.</span>
                    <Link to={"/subjects"}>Розпочати навчання</Link>
                </div>
            </div>
            <div>
                <img src="/main-humans.png"/>
            </div>
        </div>
        <div className={styles.categoriesBlock}>
            <span>
                <h1>Categories</h1>
            </span>
            <div className={styles.titlesBlock}>
                {data?.map((category) => <Link to={`/category/${category.toLowerCase()}`}><div className={styles.category}>{category.split("_").join(" ")}</div></Link>)}
            </div>
        </div>
        <div className={styles.bestWorker}>
            <div className={styles.imageContainer}>
                <img src="../../../public/teacher.jpg"></img>
            </div>
            <div className={styles.teacherAbout}>
                <h2>We are working with the best specialists</h2>
                <span>Yemets Serhii</span>
                <span>Slovak language</span>
                <span>2 years experience in communication with students of different ages and also has university degree of TUKE</span>
            </div>
        </div>
        <div className={styles.conclusionBlock}>
            <h1>Learn From the Best. Become the Best.</h1>
            <h2>Our hand-picked experts are ready to guide you. 
                Stop learning the ordinary way—start achieving extraordinary results with top specialists today.</h2>
            <Link to={"/login"}>Join us now!</Link>
        </div>
    </div>
}