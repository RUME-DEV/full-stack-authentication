import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import styles from './Auth.module.css'

function Login() {
    // Form Handling
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")


    const [showPassword, setShowPassword] = useState(false)


    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)

    const passwordRef = useRef(null)
    

    const { user, setUser } = useContext(AuthContext)


    // Navigation
    const navigate = useNavigate()


    const submit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('http://localhost:4000/user/login', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
    
            if (res.status === 404) {
                navigate("/register")
                return
            }
            const data = await res.json()

            if (!res.ok) {
                setStatus(data.message)
                passwordRef.current.focus()
                setIsError(true)
                return
            }
    
            if (res.ok) {
                setUser(data.user)
            }
        } catch (err) {
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
                <h1 onClick={changeInputType}>Login</h1>
                <p className={`${loading && styles.loading} ${isError && !loading ? styles.error : styles.success}`}>{loading ? "Loading..." : status}</p>

                <form  >
                    <input type="email" placeholder="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>

                    <input ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>


                    <button 
                    disabled={!email.trim() || !password.trim() || loading} type="submit" 
                    onClick={submit}>{loading ? "Logging In..." : "Login"}</button>
                </form>
                <Link to={"/register"}>Register</Link>
            </div>
        </ div>
    )
}

export default Login