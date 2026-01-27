import { useForm } from "react-hook-form"
import styles from "./AddStudent.module.css"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createStudent } from "../../api/students.api"
import type { InitialStudentsDto } from "../../types/students.dto"
import { useTranslation } from "react-i18next"

export default function AddStudentProfile() {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm<InitialStudentsDto>({
        mode: "onChange"
    })
    
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { t } = useTranslation("addStudent") 

    const addStudentMutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            navigate("/");
            reset();
        },
        onError: (error) => {
            console.error(t("error"), error);
        }
    });

    const onSubmit = (data: InitialStudentsDto) => {
        addStudentMutation.mutate(data);
    }

    const isSubmitting = addStudentMutation.isPending;

    return (
        <div className={"container"}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1>{t("title")}</h1>
                
                <label htmlFor="fullName">{t("fullname")}</label>
                <input 
                    id="fullName"
                    disabled={isSubmitting}
                    {...register("fullName", {
                        required: t("fullname-required"),
                        pattern: {
                            value: /^[\p{L}][\p{L}\p{M} .'\-]*[\p{L}]$/u,
                            message: t("invalid-name")
                        }
                    })}
                />
                {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                
                <label htmlFor="learningGoal">{t("learning-goal")}</label>
                <textarea 
                    id="learningGoal"
                    disabled={isSubmitting}
                    {...register("learningGoal", {
                        required: t("learning-goal-required"),
                        minLength: {
                            value: 20,
                            message: t("learning-goal-size")
                        }
                    })}
                />
                {errors.learningGoal && <p className={styles.error}>{errors.learningGoal.message}</p>}
                
                <label htmlFor="dateOfBirth">{t("dateOfBirth")}</label>
                <input 
                    id="dateOfBirth"
                    type="date" 
                    disabled={isSubmitting}
                    {...register("dateOfBirth", {
                        required: t("date-required"),
                        validate: (value) => {
                             const selectedDate = new Date(value);
                             const today = new Date();
                             return selectedDate <= today || t("date-future");
                        }
                    })}
                />
                {errors.dateOfBirth && <p className={styles.error}>{errors.dateOfBirth.message}</p>}
                
                <div className={styles.actions}>
                    <button 
                        type="button" 
                        className={styles.reset} 
                        onClick={() => reset()}
                        disabled={isSubmitting}
                    >
                        {t("reset")}
                    </button>
                    
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? t("submitting") : t("submit")}
                    </button>
                </div>
                
                {addStudentMutation.isError && (
                    <p className={styles.error}>{t("wrong")}</p>
                )}
            </form>
        </div>
    )
}