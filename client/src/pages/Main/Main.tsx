import { Link } from "react-router-dom";

export default function Main() {
    return <>
        <p>Main Page</p>
        <Link to={"/ewefw"}>Crush me</Link>
    </>
}