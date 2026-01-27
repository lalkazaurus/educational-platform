import { useForm } from "react-hook-form"
import styles from "./AddStudent.module.css"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createStudent } from "../../api/students.api"
import type { InitialStudentsDto } from "../../types/students.dto"

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

    const addStudentMutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            navigate("/");
            reset();
        },
        onError: (error) => {
            console.error("Failed to create student", error);
        }
    });

    const onSubmit = (data: InitialStudentsDto) => {
        addStudentMutation.mutate(data);
    }

    const isSubmitting = addStudentMutation.isPending;

    return (
        <div className={"container"}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1>Fill the CV</h1>
                
                <label htmlFor="fullName">Fullname</label>
                <input 
                    id="fullName"
                    disabled={isSubmitting}
                    {...register("fullName", {
                        required: "Fullname is required",
                        pattern: {
                            value: /^[\p{L}][\p{L}\p{M} .'\-]*[\p{L}]$/u,
                            message: "Invalid name format"
                        }
                    })}
                />
                {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                
                <label htmlFor="learningGoal">Bio</label>
                <textarea 
                    id="learningGoal"
                    disabled={isSubmitting}
                    {...register("learningGoal", {
                        required: "Bio is required",
                        minLength: {
                            value: 20,
                            message: "Your bio is too short (min 20 chars)"
                        }
                    })}
                />
                {errors.learningGoal && <p className={styles.error}>{errors.learningGoal.message}</p>}
                
                <label htmlFor="dateOfBirth">Date of birth</label>
                <input 
                    id="dateOfBirth"
                    type="date" 
                    disabled={isSubmitting}
                    {...register("dateOfBirth", {
                        required: "Date of birth is required",
                        validate: (value) => {
                             const selectedDate = new Date(value);
                             const today = new Date();
                             return selectedDate <= today || "Date cannot be in the future";
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
                        Reset
                    </button>
                    
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Submit"}
                    </button>
                </div>
                
                {addStudentMutation.isError && (
                    <p className={styles.error}>Something went wrong. Please try again.</p>
                )}
            </form>
        </div>
    )
}