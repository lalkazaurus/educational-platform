import { useForm } from "react-hook-form";
import styles from "./AddTeacherProfile.module.css";
import type { CreateTeacherDto } from "../../types/teacher-profile.dto";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacherProfile } from "../../api/teacher-profile.api";
import { useTranslation } from "react-i18next";

export default function AddTeacherProfile() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateTeacherDto>({
        mode: "onChange"
    });

    const { t } = useTranslation("addTeacherProfile");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const addTeacherMutation = useMutation({
        mutationFn: createTeacherProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teacherProfile"] }); 
            navigate("/");
            reset();
        },
        onError: (error) => {
            console.error(t("error"), error);
        }
    });

    const onSubmit = (data: CreateTeacherDto) => {
        console.log(data)
        addTeacherMutation.mutate(data);
    };

    const isSubmitting = addTeacherMutation.isPending;

    return (
        <div className={"container"}>
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
                    })}
                />
                {errors.fullName && <p className={styles.errorText}>{errors.fullName.message}</p>}

                <label>{t("bio")}</label>
                <textarea
                    disabled={isSubmitting}
                    {...register("bio", {
                        minLength: {
                            value: 20,
                            message: t("bio-short")
                        },
                        required: t("bio-required")
                    })}
                />
                {errors.bio && <p className={styles.errorText}>{errors.bio.message}</p>}

                <label>{t("degree")}</label>
                <textarea
                    disabled={isSubmitting}
                    {...register("degree", {
                        minLength: {
                            value: 5,
                            message: t("degree-short")
                        },
                        required: t("degree-required")
                    })}
                />
                {errors.degree && <p className={styles.errorText}>{errors.degree.message}</p>}

                <label>{t("experience")}</label>
                <textarea
                    disabled={isSubmitting}
                    {...register("experience", {
                        minLength: {
                            value: 5,
                            message: t("experience-short")
                        },
                        required: t("experience-required")
                    })}
                />
                {errors.experience && <p className={styles.errorText}>{errors.experience.message}</p>}

                <label>{t("price-per-hour")}</label>
                <input
                    type="number"
                    step="0.01"
                    disabled={isSubmitting}
                    {...register("pricePerHour", {
                        required: t("price-required"),
                        pattern: {
                            value: /^[0-9]+([.,][0-9]{1,2})?$/u,
                            message: t("price-per-hour-validate")
                        }
                    })}
                />
                {errors.pricePerHour && <p className={styles.errorText}>{errors.pricePerHour.message}</p>}

                <label>{t("icon")}</label>
                <input
                    type="file"
                    accept="image/*" 
                    disabled={isSubmitting}
                    {...register("image", {
                        required: t("image-required")
                    })}
                />
                {errors.image && <p className={styles.errorText}>{errors.image.message}</p>}

                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        className={styles.reset}
                        onClick={() => reset()}
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
                </div>

                {addTeacherMutation.isError && (
                    <p className={styles.error}>{t("wrong")}</p>
                )}
            </form>
        </div>
    );
}