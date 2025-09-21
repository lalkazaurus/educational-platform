import { Link } from "react-router-dom";
import Spinner from "../../layouts/Spinner/Spinner";

export default function Main() {
    return <>
        <p>Main Page</p>
        <Spinner/>
        <Link to={"/ewefw"}>Crush me</Link>
    </>
}