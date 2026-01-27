import { useForm } from "react-hook-form"
import styles from "./AddTeacherProfile.module.css"
import type { CreateTeacherDto } from "../../types/teacher-profile.dto"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTeacherProfile } from "../../api/teacher-profile.api"
import { useTranslation } from "react-i18next"

export default function AddTeacherProfile() {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: {errors} 
    } = useForm<CreateTeacherDto>({
        mode: "onChange"
    })
    
    const { t } = useTranslation("addTeacherProfile")
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const addTeacherMutation = useMutation({
        mutationFn: createTeacherProfile,
        onSuccess: () => {
            queryClient.clear();
            navigate("/");
            reset();
        },
        onError: (error) => {
            console.error(t("error"), error);
        }
    });

    async function onSubmit(data: CreateTeacherDto) {
        addTeacherMutation.mutate(data);
    }

    const isSubmitting = addTeacherMutation.isPending;

    return <div className={"container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1>{t("title")}</h1>
            <label>{t("fullname")}</label>
            <input
                disabled={isSubmitting} 
                {...register("fullName", {
                required: t("fullname-required"),
                pattern: {
                    value: /^[\p{L}][\p{L}\p{M} .'\-]*[\p{L}]$/u,
                    message: t("invalid-name")
                }
            })}/>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <label>{t("bio")}</label>
            <textarea 
                disabled={isSubmitting}
                {...register("bio", 
                    {
                        minLength: {
                            value: 20,
                            message: t("bio-short")
                        },
                        required: t("bio-required")
                    }
            )}/>
            {errors.bio && <p>{errors.bio.message}</p>}
            <label>{t("degree")}</label>
            <textarea 
                disabled={isSubmitting}
                {...register("degree", 
                {
                    minLength: {
                        value: 5,
                        message: t("degree-short")
                    },
                    required: t("degree-required")
                }
            )}/>
            {errors.degree && <p>{errors.degree.message}</p>}
            <label>{t("experience")}</label>
            <textarea 
                disabled={isSubmitting}
                {...register("experience", 
                    {
                        minLength: {
                            value: 5,
                            message: t("experience-short")
                        }, 
                        required: t("experience-required")
                    }
            )}/>
            {errors.experience && <p>{errors.experience.message}</p>}
            <label>{t("price-per-hour")}</label>
            <input
                type="number"
                disabled={isSubmitting}
                {...register("pricePerHour", {
                    pattern: {
                        value: /^[0-9]+([.,][0-9]{1,2})?$/u,
                        message: t("price-per-hour-validate")
                    }
                })}
            />
            {errors.pricePerHour && <p>{errors.pricePerHour.message}</p>}
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

            {addTeacherMutation.isError && (
                <p className={styles.error}>{t("wrong")}</p>
            )}
        </form>
    </div>
}