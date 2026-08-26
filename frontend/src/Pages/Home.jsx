import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import Welcome from "../Components/Welcome"
import styles from "./Pages.module.css"

function Home() {
    const { user } = useContext(AuthContext)
    console.log(`Home: `, user)

    return (
        <div className={styles.home} >   
            <h1>Home Page</h1>
            <Welcome 
            id={user?.id}
            username={user?.username}
            email={user?.email}
            />
        </div>
    )
}

export default Home