import { useParams } from "react-router-dom"

export default function SubjectsPage() {
    const { subject } = useParams()

    return <>
        <p>{subject}</p>
    </>
}