import { useForm } from "react-hook-form"
import styles from "./AddTeacherProfile.module.css"
import type { TeacherProfileDto } from "../../types/teacher-profile.dto"
import { useNavigate } from "react-router-dom"
import { createTeacherProfile } from "../../api/teacher-profile.api"

export default function AddTeacherProfile() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm<TeacherProfileDto>({
        mode: "onChange"
    })

    const navigate = useNavigate()

    async function onSubmit(data: TeacherProfileDto) {
        console.log(data)
        try {
          await createTeacherProfile(data)
          reset()
          navigate("/")
        } catch (err) {
          console.error("Error sending data:", err)
        }
    }

    return <div className={"container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <label>Fullname</label>
            <input {...register("fullName", {
                pattern: {
                    value: /^[\p{L}][\p{L}\p{M} .'\-]*[\p{L}]$/u,
                    message: "This is not a fullname"
                }
            })}/>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <label>Bio</label>
            <textarea {...register("bio", 
                {
                    minLength: {
                        value: 20,
                        message: "Your bio is too short"
                    }
                }
            )}/>
            {errors.bio && <p>{errors.bio.message}</p>}
            <label>Degree</label>
            <textarea {...register("degree", 
                {
                    minLength: {
                        value: 5,
                        message: "Your degree is too short"
                    }
                }
            )}/>
            {errors.degree && <p>{errors.degree.message}</p>}
            <label>Experience</label>
            <textarea {...register("exprerience", 
                {
                    minLength: {
                        value: 5,
                        message: "Your exprerience is too short"
                    }
                }
            )}/>
            {errors.exprerience && <p>{errors.exprerience.message}</p>}
            <label>Price per hour</label>
            <input {...register("pricePerHour", {
                    pattern: {
                        value: /^[0-9]+([.,][0-9]{1,2})?$/u,
                        message: "Please enter a valid number"
                    }
                })}
            />
            {errors.pricePerHour && <p>{errors.pricePerHour.message}</p>}
            <button onClick={() => {reset()}}>Reset</button>
            <input type="submit" value={"Submit"}/>
        </form>
    </div>
}