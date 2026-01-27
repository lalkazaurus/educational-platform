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
            console.error("Failed to create student", error);
        }
    });

    const { t } = useTranslation()

    async function onSubmit(data: RegisterDto) {
        handleRegister(data);
    }
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <label>{t("email")}</label>
            <input 
                disabled={isPending}
                {...register("email", {
                    required:  'Email is required',
                    pattern: {
                        value:
                                    /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/,
                        message: 'This is not a valid email',
                    }
                })}
            />
            {errors.email?.message && <p className={styles.error}>{errors.email?.message}</p>}

            <label>{t("password")}</label>
            <input
                disabled={isPending}
                type="password" 
                {...register("password", {
                    required: 'Password is required',
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: 'Your password not strong enough'
                    }
                })}
            />
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}

            <label>{t("phone_number")}</label>
            <input 
                disabled={isPending}
                {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "This is not a valid phone number"
                    }
                })}
            />
            {errors.phoneNumber?.message && <p className={styles.error}>{errors.phoneNumber?.message}</p>}

            <label>{t("username")}</label>
            <input 
                disabled={isPending}
                {...register("username", {
                    required: "Username is required"
                })}
            />
            {errors.username?.message && <p className={styles.error}>{errors.username?.message}</p>}

            <button 
                className={styles.reset} 
                type="button" 
                onClick={() => reset()}
                disabled={isPending}
            >
                Reset
            </button>
                
            <button 
                className={styles.submit} 
                type="submit" 
                disabled={isPending}
            >
                {isPending ? "Loading..." : "Submit"}
            </button>
        </form>
    </div>
}