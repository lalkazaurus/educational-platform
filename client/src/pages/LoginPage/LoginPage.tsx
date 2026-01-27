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
            console.error("Failed to create student", error);
        }
    });

    const { t } = useTranslation()

    async function onSubmit(data: LoginDto) {
        loginMutation.mutate(data);
    }

    const isSubmitting = loginMutation.isPending;
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <label>{t("email")}</label>
            <input
                disabled={isSubmitting}
                {...register("email", {
                    required:  'Email is required',
                    pattern: {
                        value:
                                    /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/,
                        message: 'This text has to be an email',
                    }
                })}
            />
            {errors.email?.message && <p className={styles.error}>{errors.email?.message}</p>}
            <label>{t("password")}</label>
            <input 
                type="password"
                disabled={isSubmitting}
                {...register("password", {
                    required: 'Password is required',
                })}
            />
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}
            <button 
                disabled={isSubmitting}
                className={styles.reset} 
                type="button" 
                onClick={() => reset()}
            >
                Reset
            </button>
            <input 
                disabled={isSubmitting}
                className={styles.submit} 
                type="submit" 
                value={isSubmitting ? "Saving..." : "Submit"}
            />

            {loginMutation.isError && (
                <p className={styles.error}>Something went wrong. Please try again.</p>
            )}
        </form>
    </div>
}