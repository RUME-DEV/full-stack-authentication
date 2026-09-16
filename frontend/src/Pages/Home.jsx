import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import Welcome from "../Components/Welcome"
import styles from "./Pages.module.css"

function Home() {
    // Getting User From AuthContext
    const { user } = useContext(AuthContext)

    const [status, setStatus] = useState("")
    console.log(`Home: `, user)


    // Copy Feature
    const copyId = async() => {
        try {
            await navigator.clipboard.writeText(user?.id)

            setTimeout(() => {
                setStatus("Id Copied")
            }, 1500);
        } catch(err) {
            setStatus("Error Copying Id")
        }
    }

    if (status) {
        setTimeout(() => {
            setStatus("")
        }, 5000)
    }

    return (
        <div className={styles.home} >   
            <h1>Home Page</h1>
            <p>{status}</p>
            <Welcome 
            id={user?.id}
            username={user?.username}
            email={user?.email}
            copyId={copyId}
            />
        </div>
    )
}

export default Home