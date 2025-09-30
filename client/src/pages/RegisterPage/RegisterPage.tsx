import { useForm } from "react-hook-form"
import styles from "./RegisterPage.module.css"
import type { RegisterDto } from "../../types/login.dto"
import { useTranslation } from "react-i18next"
import { registerUser } from "../../api/auth.api"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const { register, reset, formState: {errors}, handleSubmit } = useForm<RegisterDto>({
        mode: "onChange"
    })

    const { t } = useTranslation()

    const navigate = useNavigate()

    async function onSubmit(data: RegisterDto) {
        await registerUser(data)
        reset()
        navigate("/")
    }
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <label>{t("email")}</label>
            <input {...register("email", {
                required:  'Email is required',
                pattern: {
                    value:
								/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/,
                    message: 'This is not a valid email',
                }
            })}/>
            {errors.email?.message && <p className={styles.error}>{errors.email?.message}</p>}

            <label>{t("password")}</label>
            <input
                type="password" 
                {...register("password", {
                required: 'Password is required',
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Your password not strong enough'
                }
            })}/>
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}

            <label>{t("phone_number")}</label>
            <input {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "This is not a valid phone number"
                }
            })}/>
            {errors.phoneNumber?.message && <p className={styles.error}>{errors.phoneNumber?.message}</p>}

            <label>{t("username")}</label>
            <input {...register("username", {
                required: "Username is required"
            })}/>
            {errors.username?.message && <p className={styles.error}>{errors.username?.message}</p>}

            <button className={styles.reset} type="button" onClick={() => reset()}>
                Reset
            </button>
            <input className={styles.submit} type="submit" value="Submit"/>
        </form>
    </div>
}