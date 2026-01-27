import { useForm } from "react-hook-form"
import type { LoginDto } from "../../types/login.dto"
import { login } from "../../api/auth.api"
import { useTranslation } from "react-i18next"
import styles from "./LoginPage.module.css"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../../store/useAuthStore"

export default function LoginPage() {
    const { 
        register, 
        reset, 
        formState: {errors}, 
        handleSubmit 
    } = useForm<LoginDto>({
        mode: "onChange"
    })

    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const setLogin = useAuthStore(state => state.setLogin);

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setLogin(data.user, data.tokenData);
            queryClient.clear();
            navigate("/");
            reset();
        },
        onError: (error) => {
            console.error(t("login-failed"), error);
        }
    });

    const { t } = useTranslation()

    async function onSubmit(data: LoginDto) {
        loginMutation.mutate(data);
    }

    const isSubmitting = loginMutation.isPending;
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>{t("login")}</h1>
            <label>{t("email")}</label>
            <input
                disabled={isSubmitting}
                {...register("email", {
                    required:  t('email-required'),
                    pattern: {
                        value:
                                    /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/,
                        message: t("email-validate"),
                    }
                })}
            />
            {errors.email?.message && <p className={styles.error}>{errors.email?.message}</p>}
            <label>{t("password")}</label>
            <input 
                type="password"
                disabled={isSubmitting}
                {...register("password", {
                    required: t("password-required"),
                })}
            />
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}
            <button 
                disabled={isSubmitting}
                className={styles.reset} 
                type="button" 
                onClick={() => reset()}
            >
                {t("reset")}
            </button>
            <input 
                disabled={isSubmitting}
                className={styles.submit} 
                type="submit" 
                value={isSubmitting ? t("submitting") : t("submit")}
            />

            {loginMutation.isError && (
                <p className={styles.error}>{t("wrong")}</p>
            )}
        </form>
    </div>
}