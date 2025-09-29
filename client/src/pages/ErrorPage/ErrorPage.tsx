import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css"

export default function ErrorPage() {
    return <div className="container">
        <div className={styles.errorBlock}>
            <p>404 Page not found</p>
            <div><Link to={"/"}>Click here to move to Main Page</Link></div>
        </div>
    </div>
}