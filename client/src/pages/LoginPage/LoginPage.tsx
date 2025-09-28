import { useForm } from "react-hook-form"
import type { LoginDto } from "../../types/login.dto"
import { login } from "../../api/auth.api"
import { useTranslation } from "react-i18next"
import styles from "./LoginPage.module.css"

export default function LoginPage() {
    const { register, reset, formState: {errors}, handleSubmit } = useForm<LoginDto>({
        mode: "onChange"
    })

    const { t } = useTranslation()

    async function onSubmit(data: LoginDto) {
        await login(data)
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
            <input {...register("password", {
                required: 'Password is required',
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Your password not strong enough'
                }
            })}/>
            {errors.password?.message && <p className={styles.error}>{errors.password?.message}</p>}

            <button type="button" onClick={() => reset()}>
                Reset
            </button>
            <input type="submit" value="Submit"/>
        </form>
    </div>
}