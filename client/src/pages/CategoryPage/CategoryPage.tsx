import { useLocation, useNavigate, useParams } from "react-router-dom"
import NoneCategory from "./elements/NoneCategory/NoneCategory"
import { useSubjects } from "../../hooks/useSubjects"
import Spinner from "../../layouts/Spinner/Spinner"
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
    const { category } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const colors = ["#b39ddb", "#fff176", "#FFA8A5"]
    
    if (!category) {
        navigate("/")
    }    

    const categoryName = category!.toUpperCase().split(" ").join("_")

    const { 
        data, 
        isLoading, 
        error 
    } = useSubjects(categoryName || "")

    if (!category) return <p>Error</p>

    if (isLoading) {
        return <Spinner/>
    }

    if (error || !data) {
        return <NoneCategory/>
    }

    return (
        <div className="container">
            <h1>{categoryName.split("_").join(" ")}</h1>
            <div className={styles.container}>
                {data.map((subject, index) => 
                    <div
                        className={styles.subjectCard}
                        style={{ backgroundColor: colors[index % 3] }}
                        onClick={() => navigate(`${location.pathname}/subject/${subject.name.split(" ").join("-")}`)}
                    >
                        <img 
                            src={`data:image/png;base64,${subject.icon}`} 
                            alt={subject.name}
                        />
                        <div className={styles.textBlock}>
                            <h2>{subject.name}</h2>
                            <span>{subject.description}</span>
                            <span>Levels: {subject.level.map((level) => (
                                <strong className={styles.levelsText}>{level[0] + level.slice(1).split("_").join("-").toLowerCase() + " "}</strong>
                            ))}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}