import { useEffect } from "react"; 
import { useForm } from "react-hook-form";
import type { InitialStudentsDto } from "../../types/students.dto";
import { findStudentByUserId, updateStudent } from "../../api/students.api";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import styles from "./EditStudentProfile.module.css"
import { useNavigate } from "react-router-dom";
import Spinner from "../../layouts/Spinner/Spinner";
import ErrorMessage from "../../layouts/ErrorMessage/ErrorMessage";

export default function EditStudentProfile() {
    const { 
        isLoading, 
        data: studentData, 
        isError, 
        error
    } = useQuery<InitialStudentsDto, AxiosError<ApiError>>({
        queryKey: ["findStudentByUserId"], 
        queryFn: () => findStudentByUserId()
    });

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting }
    } = useForm<InitialStudentsDto>({
        mode: "onChange"
    });

    useEffect(() => {
        if (studentData && studentData.dateOfBirth) {
            const date = new Date(studentData.dateOfBirth);
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            const formattedDate = `${year}-${month}-${day}`;

            reset({
                ...studentData,
                dateOfBirth: formattedDate
            });
        }
    }, [studentData, reset]);

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { t } = useTranslation("addStudent")

    const editStudentMutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['updateStudent'] });
            navigate("/student-profile");
            reset();
        },
        onError: (error) => {
            console.error(t("error"), error);
        }
    });

    const onSubmit = async (formData: InitialStudentsDto) => {
        editStudentMutation.mutate(formData)
    };

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
                                <label htmlFor="learningGoal">{t("learning-goal")}</label>
                            </td>
                            <td className={styles.valueCell}>
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
                            </td>
                        </tr>
                        {errors.learningGoal && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.learningGoal.message}
                                </p>
                            </td>
                        </tr>}
                        <tr>
                            <td className={styles.field}>
                                <label htmlFor="dateOfBirth">{t("dateOfBirth")}</label>
                            </td>
                            <td className={styles.valueCell}>
                                <input 
                                    id="dateOfBirth"
                                    type="date" 
                                    disabled={isSubmitting}
                                    {...register("dateOfBirth", {
                                        required: t("date-required"),
                                        validate: (value) => {
                                            const selectedDate = new Date(value);
                                            const today = new Date();
                                            today.setHours(0,0,0,0); 
                                            return selectedDate <= today || t("date-future");
                                        }
                                    })}
                                />
                            </td>
                        </tr>
                        {errors.dateOfBirth && <tr>
                            <td colSpan={2}>
                                <p className={styles.error}>
                                    {errors.dateOfBirth.message}
                                </p>
                            </td>
                        </tr>}
                    </tbody>
                </table>
                <div className={styles.actions}>
                    <button 
                        type="button" 
                        className={styles.reset} 
                        onClick={() => reset(studentData)} 
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