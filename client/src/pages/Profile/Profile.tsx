import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import styles from "./Profile.module.css"
import { formatDate } from "../../format/date.format";
import { useTranslation } from "react-i18next";
import AccountLinks from "./components/AccountLinks/AccountLinks";

export default function Profile() {
    const user = useAuthStore( (state) => state.user )
    const { t } = useTranslation("profile")
    const navigate = useNavigate()
    if (!user) {
        navigate("/login")
        return null;
    }

    return <div className={"container"}>
        <table className={styles.info}>
            <thead>
                <tr>
                    <td className={styles.title} colSpan={2}>{t("your-profile")}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.field}>{t("username")}</td>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("email")}</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("roles")}</td>
                    <td>{user.roles.join(", ")}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("phone-number")}</td>
                    <td>{user.phoneNumber}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("status")}</td>
                    <td>{user.status}</td>
                </tr>
                <tr>
                    <td className={styles.field}>{t("last-login")}</td>
                    <td>{formatDate(user.lastLogin)}</td>
                </tr>
            </tbody>
        </table>
        <AccountLinks roles={user.roles}/>
        <a className={styles.passwordChange} href="/change-password">{t("change-password")}</a>
    </div>
}