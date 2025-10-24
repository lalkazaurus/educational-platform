import { Link } from "react-router-dom";
import styles from "./NoneCategory.module.css";

export default function NoneCategory() {
    return (
        <div className="container">
            <div className={styles.errorBlock}>
                <h1>Oops!</h1>
                <h2>Sorry, we don’t have any subjects in this category 😅</h2>
                <Link to="/">Return to the main page</Link>
            </div>
        </div>
    );
}
