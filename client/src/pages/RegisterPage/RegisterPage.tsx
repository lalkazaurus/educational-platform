import { useForm } from "react-hook-form"
import styles from "./RegisterPage.module.css"
import type { RegisterDto } from "../../types/login.dto"
import { useTranslation } from "react-i18next"
import { registerUser } from "../../api/auth.api"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../../store/useAuthStore"

export default function RegisterPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setLogin = useAuthStore((state) => state.setLogin);

    const { 
        register, 
        reset, 
        formState: { errors }, 
        handleSubmit 
    } = useForm<RegisterDto>({
        mode: "onChange"
    });

    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setLogin(data.saveUser, data.tokenData);
            queryClient.clear();
            navigate("/");
            reset();
        }, 
        onError: (error) => {
            console.error(t("register-failed"), error);
        }
    });

    const { t } = useTranslation()

    async function onSubmit(data: RegisterDto) {
        handleRegister(data);
    }
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>{t("register")}</h1>
            <label>{t("email")}</label>
            <input 
                disabled={isPending}
                {...register("email", {
                    required:  t("email-required"),
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
                disabled={isPending}
                type="password" 
                {...register("password", {
                    required: t("password-required"),
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: t("password-validate")
                    }
                })}
            />
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}

            <label>{t("phone_number")}</label>
            <input 
                disabled={isPending}
                {...register("phoneNumber", {
                    required: t("phone-number-required"),
                    pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: t("phone-number-validate")
                    }
                })}
            />
            {errors.phoneNumber?.message && <p className={styles.error}>{errors.phoneNumber?.message}</p>}

            <label>{t("username")}</label>
            <input 
                disabled={isPending}
                {...register("username", {
                    required: t("username-required")
                })}
            />
            {errors.username?.message && <p className={styles.error}>{errors.username?.message}</p>}

            <button 
                className={styles.reset} 
                type="button" 
                onClick={() => reset()}
                disabled={isPending}
            >
                {t("reset")}
            </button>
                
            <button 
                className={styles.submit} 
                type="submit" 
                disabled={isPending}
            >
                {isPending ? t("submitting") : t("submit")}
            </button>
        </form>
    </div>
}