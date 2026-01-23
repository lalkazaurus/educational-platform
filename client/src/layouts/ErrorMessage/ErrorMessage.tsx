import type { AxiosError } from "axios";
import type { ApiError } from "../../types/api";
import styles from "./ErrorMessage.module.css"

interface ErrorMessageProps {
    error: AxiosError<ApiError>;
}

export default function ErrorMessage({error} : ErrorMessageProps) {
    const message =
        error.response?.data?.message ??
        error.message ??
        "Щось пішло не так";

    return <div className={styles.errorBlock}>
        <p>{`Error - ${error.response?.data.errorCode}`}</p>
        <span>{message}</span>
        <a href="/">Go back to Main Page</a>
    </div>;
}
