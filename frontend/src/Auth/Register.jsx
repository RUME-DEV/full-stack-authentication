import { useEffect, useState } from "react"
import { useNavigate, Link, replace } from "react-router-dom"
import styles from './Auth.module.css'


function Register() {
    // Form Handling
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 

    // Status From The Backend Response
    const [status, setStatus] = useState("")

    // Changing Input Type On State Chenge
    const [showPassword, setShowPassword] = useState(false)

    // User Experince: changing status color depending on error Also
    // disabling button if loading, which happens between getting the data and receiving a response
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)

    // Use Navigate Hook For Navigation
    const navigate = useNavigate()

    const submit = async(e) => {
        e.preventDefault()
        console.log(username, email, password)
        setLoading(true)

        try {
            const res = await fetch('http://localhost:4000/user/register',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            )

            if (res.status === 409) {
                navigate('/login')
            }
    
            const data = await res.json()
    
            if (!res.ok) {
                setStatus(data.message)
                setIsError(true)
                return
            }

            if (res.ok) navigate('/login', { replace: true })
        } catch(err) {
            console.error(err)
            setIsError(true)
            setStatus("Something Went Wrong")
        } finally {
            setLoading(false)
        }
    }


    const changeInputType = () => {
        setShowPassword(!showPassword)
    }



    return (
        <div className={styles.guestRoot}>
            <div className={styles.guestContainer}>
                <h1 onClick={changeInputType}>Register</h1>

                <p className={`${loading && styles.loading} ${isError && !loading ? styles.error : styles.success}`}>{loading ? "Loading..." : status}</p>

                <form>
                    <input type="text" placeholder="username" value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>

                    <input type="email" placeholder="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>

                    <input type={showPassword ? "text" : "password"} placeholder="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>


                    <button 
                    disabled={
                        !username.trim() ||
                        !email.trim() || 
                        !password.trim() || 
                        loading
                    } type="submit" 
                    onClick={submit}>{loading ? "Registering..." : "Register"}</button>
                </form>
                <Link to={"/login"}>Login</Link>
            </div>
        </div>
    )
}

export default Register