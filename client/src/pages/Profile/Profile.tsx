import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import styles from "./Profile.module.css"
import { formatDate } from "../../format/date.format";

export default function Profile() {
    const user = useAuthStore( (state) => state.user )
    const navigate = useNavigate()
    if (!user) {
        navigate("/login")
        return null;
    }

    return <div className={"container"}>
        <table className={styles.info}>
            <tr>
                <td className={styles.title} colSpan={2}>Your profile</td>
            </tr>
            <tr>
                <td className={styles.field}>Username:</td>
                <td>{user.username}</td>
            </tr>
            <tr>
                <td className={styles.field}>Email:</td>
                <td>{user.email}</td>
            </tr>
            <tr>
                <td className={styles.field}>Roles: </td>
                <td>{user.roles.join(" ")}</td>
            </tr>
            <tr>
                <td className={styles.field}>Phone number: </td>
                <td>{user.phoneNumber}</td>
            </tr>
            <tr>
                <td className={styles.field}>Status</td>
                <td>{user.status}</td>
            </tr>
            <tr>
                <td className={styles.field}>Last login: </td>
                <td>{formatDate(user.lastLogin)}</td>
            </tr>
        </table>
        <a className={styles.passwordChange} href="/change-password">Do you want to change password?</a>
    </div>
}