import { useForm } from "react-hook-form"
import type { ChangePasswordData, ChangePasswordDto } from "../../types/login.dto"
import styles from "./ChangePassword.module.css"
import { useAuthStore } from "../../store/useAuthStore"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { changePassword } from "../../api/auth.api"
import { useNavigate } from "react-router-dom"

export default function ChangePassword() {
    const { register, watch,  handleSubmit, reset, formState: {errors} } = useForm<ChangePasswordDto>({
        mode: "onChange"
    })

    const password = watch("password")
    const newPassword = watch("newPassword")
    const queryClient = new QueryClient()
    const navigate = useNavigate()

    const email = useAuthStore( (state) => state.user?.email )

    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            queryClient.clear();
            navigate("/profile");
            reset();
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
    
    return <div className="container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Changing password</h1>
            <label>Password</label>
            <input type="password" {...register("password", {
                "required": "This field is required"
            })}/>
            <label>Enter new password</label>
            <input type="password" {...register("newPassword", {
                required: 'Password is required',
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Your password not strong enough'
                },
                validate: (value) => value !== password || "New password has not to be eqaual to the old one."
            })}/>
            {errors.newPassword && <p>{errors.newPassword?.message}</p>}
            <label>Enter new password second time</label>
            <input type="password" {...register("passwordRepeat", {
                validate: (value) => value === newPassword || "Passwords aren't equal."
            })}/>
            {errors.passwordRepeat && <p>{errors.passwordRepeat?.message}</p>}
            <button 
                type="button" 
                className={styles.reset} 
                onClick={() => {reset()}}
            >
                Reset
            </button>
            <button type="submit">
                Submit
            </button>
        </form>
    </div>
}