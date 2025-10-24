import { useParams } from "react-router-dom"

export default function CategoryPage() {
    const { category } = useParams()

    if (!category) return <p>Error</p>

    const categoryName = category[0].toUpperCase() + category.slice(1).split("_").join(" ")

    return (
        <div className="container">
            <p>{categoryName}</p>
        </div>
    )
}