import { useForm } from "react-hook-form"
import type { InitialSubjectDto } from "../../types/subject.dto"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getLevels } from "../../api/enums.api"
import Spinner from "../../layouts/Spinner/Spinner"
import { useState } from "react"
import { createSubject } from "../../api/subject.api"
import styles from "./AddSubject.module.css"

export default function AddSubject() {
  const { data: categories, isLoading: categoriesIsLoading } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { data: levels, isLoading: levelsIsLoading } = useQuery<string[]>({
    queryKey: ["levels"],
    queryFn: getLevels,
  })

  const [preview, setPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<InitialSubjectDto>({
    mode: "onChange"
  })

  async function onSubmit(data: InitialSubjectDto) {
    const preparedData = {
      ...data,
      category: data.category,
      level: Array.isArray(data.level) ? data.level : [data.level],
    }
    console.log(data)
    console.log("Sending to backend:", preparedData)
    try {
      await createSubject(preparedData)
      reset()
      setPreview(null)
    } catch (err) {
      console.error("Error sending data:", err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string

      const cleanBase64 = result.split(",")[1]

      setValue("icon", cleanBase64) 
      setPreview(result) 
    }

    reader.readAsDataURL(file)
  }

  if (categoriesIsLoading || levelsIsLoading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Subject</h1>

        <label>Subject name</label>
        <input
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
              message: "It has to start from the capital letter",
            },
          })}
          placeholder="Subject name"
        />
        {errors.name?.message && <p>{errors.name.message}</p>}

        <label>Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            pattern: {
              value: /^[A-Z][\s\S]{4,499}$/,
              message: "It has to start from the capital letter",
            },
          })}
          placeholder="Description"
        />
        {errors.description?.message && <p>{errors.description.message}</p>}

        <label>Category</label>
        <select {...register("category", { required: "Category is required" })}>
          <option value="">Select category...</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category.replaceAll("_", " ").toLowerCase()}
            </option>
          ))}
        </select>
        {errors.category?.message && <p>{errors.category.message}</p>}

        {/* LEVELS */}
        <label>Levels</label>
        <select
          {...register("level", { required: "Levels are required" })}
          multiple
        >
          {levels?.map((level) => (
            <option key={level} value={level}>
              {level.replaceAll("_", " ").toLowerCase()}
            </option>
          ))}
        </select>
        {errors.level?.message && <p>{errors.level.message}</p>}

        {/* ICON UPLOAD */}
        <label>Icon</label>
        <div className={styles.fileUpload}>
          <input
            id="iconUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <button
            type="button"
            onClick={() => document.getElementById("iconUpload")?.click()}
            className={styles.fileButton}
          >
            Choose file
          </button>
          {preview && <img src={preview} alt="Preview" />}
        </div>

        {/* BUTTONS */}
        <button type="submit">
          Submit
        </button>

        <button
          className={styles.reset}
          type="button"
          onClick={() => {
            reset()
            setPreview(null)
          }}
        >
          Reset
        </button>
      </form>
    </div>
  )
}
