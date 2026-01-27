import { useForm } from "react-hook-form"
import type { ChangePasswordData, ChangePasswordDto } from "../../types/login.dto"
import styles from "./ChangePassword.module.css"
import { useAuthStore } from "../../store/useAuthStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changePassword } from "../../api/auth.api"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ChangePassword() {
    const { register, watch,  handleSubmit, reset, formState: {errors} } = useForm<ChangePasswordDto>({
        mode: "onChange"
    })

    const password = watch("password")
    const newPassword = watch("newPassword")
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { t } = useTranslation("changePassword")

    const email = useAuthStore( (state) => state.user?.email )

    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            queryClient.clear();
            navigate("/profile");
            reset();
        },
        onError: (error) => {
            console.error(t("error"), error);
        }
    })

    function onSubmit(data: ChangePasswordDto) {
        if (!email) {
            return null;
        } else {
            const resultedData: ChangePasswordData = {
                password: data.password,
                newPassword: data.newPassword,
                email: email
            }
            changePasswordMutation.mutate(resultedData)
        }
    }

    const isSubmitting = changePasswordMutation.isPending;
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>{t("title")}</h1>
            <label>{t("password")}</label>
            <input 
                type="password"
                disabled={isSubmitting}
                {...register("password", {
                    "required": t("password-required")
                })}
            />
            <label>{t("new-password")}</label>
            <input type="password"
                disabled={isSubmitting} 
                {...register("newPassword", {
                    required: t("password-required"),
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: t("new-password-validate")
                    },
                    validate: (value) => value !== password || t("passwords-not-equal")
                })}
            />
            {errors.newPassword && <p>{errors.newPassword?.message}</p>}
            <label>{t("second-time")}</label>
            <input 
                type="password"
                disabled={isSubmitting} 
                {...register("passwordRepeat", {
                    required: t("password-required"),
                    validate: (value) => value === newPassword || t("passwords-not-equal-small")
                })}
            />
            {errors.passwordRepeat && <p>{errors.passwordRepeat?.message}</p>}
            <button 
                type="button" 
                className={styles.reset} 
                onClick={() => {reset()}}
                disabled={isSubmitting}
            >
                {t("reset")}
            </button>
            <button 
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? t("submitting") : t("submit")}
            </button>

            {changePasswordMutation.isError && (
                <p className={styles.error}>{t("wrong")}</p>
            )}
        </form>
    </div>
}