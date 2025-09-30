import { useForm } from "react-hook-form"
import type { LoginDto } from "../../types/login.dto"
import { login } from "../../api/auth.api"
import { useTranslation } from "react-i18next"
import styles from "./LoginPage.module.css"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const { register, reset, formState: {errors}, handleSubmit } = useForm<LoginDto>({
        mode: "onChange"
    })

    const navigate = useNavigate()

    const { t } = useTranslation()

    async function onSubmit(data: LoginDto) {
        await login(data)
        reset()
        navigate("/")
    }
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <label>{t("email")}</label>
            <input {...register("email", {
                required:  'Email is required',
                pattern: {
                    value:
								/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/,
                    message: 'This text has to be an email',
                }
            })}/>
            {errors.email?.message && <p className={styles.error}>{errors.email?.message}</p>}

            <label>{t("password")}</label>
            <input 
                type="password"
                {...register("password", {
                required: 'Password is required',
            })}/>
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}

            <button className={styles.reset} type="button" onClick={() => reset()}>
                Reset
            </button>
            <input className={styles.submit} type="submit" value="Submit"/>
        </form>
    </div>
}