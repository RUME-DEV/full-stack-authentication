import { Link } from "react-router-dom"
import Welcome from "./Welcome"
function NotFoundComponent({link, linkName}) {
    return (
        <div>
            <h1>Page Not Found</h1>
            <Link to={link}>{linkName}</Link>
        </div>
    )
}

export default NotFoundComponent