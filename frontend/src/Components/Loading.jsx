import { useContext } from "react"
import styles from "./Component.module.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"


function Loading() {
    const { user } = useContext(AuthContext)

    return (
        <div className={styles.loadingRoot}>
            {
                user 
                ? <Link to={'/'}> {"<-"} Go Home</Link>
                : null 
            }
            <div className={styles.loading}>
            </div>
            <p>.</p>
        </div>
    )
}


export default Loading