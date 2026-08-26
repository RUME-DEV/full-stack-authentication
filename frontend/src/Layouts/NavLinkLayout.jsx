import { useContext, useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import styles from "./Layout.module.css"


function NavLinkLayout() {
    const { user, setUser } = useContext(AuthContext)
    const [loadingLogout, setLoadingLogout] = useState(false)
    const navigate = useNavigate()


    const logOut = async() => {
        setLoadingLogout(true)
        try {
            const res = await fetch('http://localhost:4000/user/logout', {
                credentials: "include"
            })

            if (!res.ok) {
                throw new Error("LogOut Error")
            }

            const data = await res.json()
            console.log(data.message)

            setUser(null)

            navigate('/login', { replace: true })
        } catch(err) {
            console.error(err)
        } finally {

            setLoadingLogout(false)
        }
    }


    return (
        <>
            <div className={styles.navLinkLayout}>
                <button disabled={loadingLogout} onClick={logOut}>
                    {loadingLogout ? "Logging Out..." : "LogOut"}
                </button>
                
                <ul>
                    <li><NavLink end to={"/dashboard"} className={({ isActive }) => isActive ? styles.active : null} >Dashboard</NavLink></li>
                    <li><NavLink to={"/"} className={({ isActive }) => isActive ? styles.active : null} >Home</NavLink></li>
                </ul>
            </div>

            <Outlet />
        </>
    )
}

export default NavLinkLayout