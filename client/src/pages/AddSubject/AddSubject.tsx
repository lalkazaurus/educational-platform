import { useForm } from "react-hook-form"
import type { InitialSubjectDto } from "../../types/subject.dto"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getLevels } from "../../api/enums.api"
import Spinner from "../../layouts/Spinner/Spinner"
import { useState } from "react"
import { createSubject } from "../../api/subject.api"
import styles from "./AddSubject.module.css"
import { useTranslation } from "react-i18next"

export default function AddSubject() {
  const { 
    data: categories, 
    isLoading: categoriesIsLoading 
  } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { t } = useTranslation("addSubject")

  const { 
    data: levels, 
    isLoading: levelsIsLoading 
  } = useQuery<string[]>({
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
    try {
      await createSubject(preparedData)
      reset()
      setPreview(null)
    } catch (err) {
      console.error(t("error-data"), err)
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
        <h1>{t("title")}</h1>

        <label>{t("subject-name")}</label>
        <input
          {...register("name", {
            required: t("subject-name-required"),
            pattern: {
              value: /^[A-Z][a-zA-Z]*(?: [a-zA-Z]+)*$/,
              message: t("subject-name-validate"),
            },
          })}
          placeholder={t("subject-name")}
        />
        {errors.name?.message && <p>{errors.name.message}</p>}

        <label>{t("description")}</label>
        <textarea
          {...register("description", {
            required: t("description-required"),
            pattern: {
              value: /^[A-Z][\s\S]{4,499}$/,
              message: t("description-validate"),
            },
          })}
          placeholder={t("description")}
        />
        {errors.description?.message && <p>{errors.description.message}</p>}

        <label>Category</label>
        <select {...register("category", { required: t("levels-required")})}>
          <option value="">{t("select-category")}</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category.replaceAll("_", " ").toLowerCase()}
            </option>
          ))}
        </select>
        {errors.category?.message && <p>{errors.category.message}</p>}

        <label>{t("levels")}</label>
        <select
          {...register("level", { required: t("levels-required") })}
          multiple
        >
          {levels?.map((level) => (
            <option key={level} value={level}>
              {level.replaceAll("_", " ").toLowerCase()}
            </option>
          ))}
        </select>
        {errors.level?.message && <p>{errors.level.message}</p>}

        <label>{t("icon")}</label>
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
            {t("choose-file")}
          </button>
          {preview && <img src={preview} alt="Preview" />}
        </div>

        <button type="submit">
          {t("submit")}
        </button>

        <button
          className={styles.reset}
          type="button"
          onClick={() => {
            reset()
            setPreview(null)
          }}
        >
          {t("reset")}
        </button>
      </form>
    </div>
  )
}
