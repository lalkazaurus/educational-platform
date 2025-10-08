import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Main.module.css"

export default function Main() {
    const { t } = useTranslation()

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
    </div>
}