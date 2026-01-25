import { useForm } from "react-hook-form"
import styles from "./AddStudent.module.css"
import { useNavigate } from "react-router-dom"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { createStudent } from "../../api/students.api"
import type { InitialStudentsDto } from "../../types/students.dto"

export default function AddStudentProfile() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm<InitialStudentsDto>({
        mode: "onChange"
    })
    const queryClient = new QueryClient()

    const navigate = useNavigate()

    const addTeacherMutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.clear();
            navigate("/");
            reset();
        }
    });

    async function onSubmit(data: InitialStudentsDto) {
        addTeacherMutation.mutate(data);
    }

    return <div className={"container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1>Fill the CV</h1>
            <label>Fullname</label>
            <input {...register("fullName", {
                pattern: {
                    value: /^[\p{L}][\p{L}\p{M} .'\-]*[\p{L}]$/u,
                    message: "This is not a fullname"
                }
            })}/>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <label>Bio</label>
            <textarea {...register("learningGoal", 
                {
                    minLength: {
                        value: 20,
                        message: "Your bio is too short"
                    }
                }
            )}/>
            {errors.learningGoal && <p>{errors.learningGoal.message}</p>}
            <label>Date of birth</label>
            <input type="date" {...register("dateOfBirth", 
                {
                    minLength: {
                        value: 5,
                        message: "Your degree is too short"
                    }
                }
            )}/>
            {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
            
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