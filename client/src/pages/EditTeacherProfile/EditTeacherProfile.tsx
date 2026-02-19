import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import styles from "./EditTeacherProfile.module.css"
import { useNavigate } from "react-router-dom";
import Spinner from "../../layouts/Spinner/Spinner";
import ErrorMessage from "../../layouts/ErrorMessage/ErrorMessage";
import type { CreateTeacherDto, TeacherProfileDto, UpdateTeacherProfileDto } from "../../types/teacher-profile.dto";
import { findTeacherByUserId, updateTeacherProfile } from "../../api/teacher-profile.api";
import { useEffect } from "react";

export default function EditTeacherProfile() {
    const { 
        isLoading, 
        data: teacherData, 
        isError, 
        error
    } = useQuery<TeacherProfileDto, AxiosError<ApiError>>({
        queryKey: ["findTeacherByUserId"], 
        queryFn: () => findTeacherByUserId()
    });

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors }
    } = useForm<CreateTeacherDto>({
        mode: "onChange"
    });

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { t } = useTranslation("addTeacherProfile");

    const editTeacherMutation = useMutation({
        mutationFn: updateTeacherProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['updateTeacher'] });
            navigate("/teacher-profile");
            reset();
        },
        onError: (error) => {
            console.error(t("error"), error);
        }
    });

    const isSubmitting = editTeacherMutation.isPending;

    const onSubmit = async (formData: UpdateTeacherProfileDto) => {
        const dataToProvide: UpdateTeacherProfileDto = {
            bio: formData.bio,
            degree: formData.degree,
            pricePerHour: formData.pricePerHour,
            experience: formData.experience,
            fullName: formData.fullName
        }
        editTeacherMutation.mutate(dataToProvide)
    };

    useEffect(() => {
        if (teacherData) {
            reset({
                ...teacherData
            });
        }
    }, [teacherData, reset]);

    if (isLoading) return <Spinner/>;
    if (isError) return <ErrorMessage error={error}/>;

    return (
        <div className={"container"}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <table className={styles.info}>
                    <thead>
                        <tr>
                            <td className={styles.title} colSpan={2}><span>{t("edit-title")}</span></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.field}>
                                <label htmlFor="fullName">{t("fullname")}</label>
                            </td>
                            <td className={styles.valueCell}>
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
                            </td>
                        </tr>
                        {errors.fullName && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.fullName.message}
                                </p>
                            </td>
                        </tr>}
                        <tr>
                            <td className={styles.field}>
                                <label htmlFor="bio">{t("bio")}</label>
                            </td>
                            <td className={styles.valueCell}>
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
                            </td>
                        </tr>
                        {errors.bio && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.bio.message}
                                </p>
                            </td>
                        </tr>}
                        <tr>
                            <td className={styles.field}>
                                <label htmlFor="degree">{t("degree")}</label>
                            </td>
                            <td className={styles.valueCell}>
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
                            </td>
                        </tr>
                        {errors.degree && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.degree.message}
                                </p>
                            </td>
                        </tr>}
                        <tr>
                            <td className={styles.field}>
                                <label htmlFor="experience">{t("experience")}</label>
                            </td>
                            <td className={styles.valueCell}>
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
                            </td>
                        </tr>
                        {errors.experience && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.experience.message}
                                </p>
                            </td>
                        </tr>}
                        <tr>
                            <td className={styles.field}>
                                <label htmlFor="pricePerHour">{t("price-per-hour")}</label>
                            </td>
                            <td className={styles.valueCell}>
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
                            </td>
                        </tr>
                        {errors.pricePerHour && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.pricePerHour.message}
                                </p>
                            </td>
                        </tr>}
                        {errors.pricePerHour && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.pricePerHour.message}
                                </p>
                            </td>
                        </tr>}
                    </tbody>
                </table>
                <div className={styles.actions}>
                    <button 
                        type="button" 
                        className={styles.reset} 
                        onClick={() => reset(teacherData)} 
                        disabled={isSubmitting}
                    >
                        {t("reset")}
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={styles.submit}
                    >
                        {isSubmitting ? t("submitting") : t("submit")}
                    </button>
                </div>
            </form>
        </div>
    );
}