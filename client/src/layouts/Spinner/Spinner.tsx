import { GridLoader } from "react-spinners";
import styles from "./Spinner.module.css"

export default function Spinner() {
    return <div className={styles.spinnerContainer}>
        <GridLoader size={30} margin={2} color="#CCCCFF"/>
    </div> 
}