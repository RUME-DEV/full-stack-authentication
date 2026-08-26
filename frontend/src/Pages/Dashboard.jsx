import { useContext, useRef, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import styles from "./Pages.module.css"
import { Form, useActionData, useNavigation } from "react-router-dom"

function Dashboard() {
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext)

    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    
    const data = useActionData()
    const message = data?.message


    const nameInputRef = useRef(null)


    const deleteUser = async() => {
        try {
            setLoading(true)
            const res = await fetch('http://localhost:4000/user/delete', {
                method: "DELETE",
                credentials: "include"
            })

            if (res.status === 401) {
                setUser(null)
            }
            
            const data = await res.json()
            if (!res.ok) {
                setStatus(data.message)
                return
            }

            setStatus(data.message)
            setUser(null)

        } catch (err) {
            console.error(err)
            setStatus("Something Went Wrong")
        } finally {
            setLoading(false)
        }


    }

    
    // if (isSubmitting) console.log(navigation.formData.get('name'))
    
    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <p>{message}</p>
            <p>{status}</p>

            <Form method="post">
                <input ref={nameInputRef} type="text" name="name" placeholder="name" />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </Form>

            <div>
                <button disabled={loading} onClick={deleteUser}>{!loading ? "Delete User" : "Deleting User..."}</button>
            </div>
        </div>
    )
}

export default Dashboard