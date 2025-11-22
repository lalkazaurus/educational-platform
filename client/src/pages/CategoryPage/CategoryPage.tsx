import { useNavigate, useParams } from "react-router-dom"
import NoneCategory from "./elements/NoneCategory/NoneCategory"
import { useSubjects } from "../../hooks/useSubjects"
import Spinner from "../../layouts/Spinner/Spinner"

export default function CategoryPage() {
    const { category } = useParams()
    const navigate = useNavigate()
    
    if (!category) {
        navigate("/")
    }    

    const categoryName = category!.toUpperCase().split(" ").join("_")

    const { data, isLoading, error } = useSubjects(categoryName || "")

    if (!category) return <p>Error</p>

    if (isLoading) {
        return <Spinner/>
    }

    if (error || !data) {
        return <NoneCategory/>
    }

    return (
        <div className="container">
            <p>{categoryName}</p>
            <div>
                {data.map((subject) => 
                    <div>
                        {subject.icon}
                        {subject.name}
                        {subject.description}
                        {subject.level}
                    </div>
                )}
            </div>
        </div>
    )
}