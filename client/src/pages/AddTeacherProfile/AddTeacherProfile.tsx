import { useForm } from "react-hook-form"
import styles from "./AddTeacherProfile.module.css"
import type { CreateTeacherDto } from "../../types/teacher-profile.dto"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTeacherProfile } from "../../api/teacher-profile.api"

export default function AddTeacherProfile() {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: {errors} 
    } = useForm<CreateTeacherDto>({
        mode: "onChange"
    })
    
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
            console.error("Failed to create teacher profile", error);
        }
    });

    async function onSubmit(data: CreateTeacherDto) {
        addTeacherMutation.mutate(data);
    }

    const isSubmitting = addTeacherMutation.isPending;

    return <div className={"container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1>Fill the CV</h1>
            <label>Fullname</label>
            <input
                disabled={isSubmitting} 
                {...register("fullName", {
                pattern: {
                    value: /^[\p{L}][\p{L}\p{M} .'\-]*[\p{L}]$/u,
                    message: "This is not a fullname"
                }
            })}/>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <label>Bio</label>
            <textarea 
                disabled={isSubmitting}
                {...register("bio", 
                    {
                        minLength: {
                            value: 20,
                            message: "Your bio is too short"
                        }
                    }
            )}/>
            {errors.bio && <p>{errors.bio.message}</p>}
            <label>Degree</label>
            <textarea 
                disabled={isSubmitting}
                {...register("degree", 
                {
                    minLength: {
                        value: 5,
                        message: "Your degree is too short"
                    }
                }
            )}/>
            {errors.degree && <p>{errors.degree.message}</p>}
            <label>Experience</label>
            <textarea 
                disabled={isSubmitting}
                {...register("experience", 
                    {
                        minLength: {
                            value: 5,
                            message: "Your exprerience is too short"
                        }
                    }
            )}/>
            {errors.experience && <p>{errors.experience.message}</p>}
            <label>Price per hour</label>
            <input
                type="number"
                disabled={isSubmitting}
                {...register("pricePerHour", {
                    pattern: {
                        value: /^[0-9]+([.,][0-9]{1,2})?$/u,
                        message: "Please enter a valid number"
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
                Reset
            </button>
            <button 
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving..." : "Submit"}
            </button>

            {addTeacherMutation.isError && (
                <p className={styles.error}>Something went wrong. Please try again.</p>
            )}
        </form>
    </div>
}