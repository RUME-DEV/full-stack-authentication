import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import Loading from "../Components/Loading"

function DashboardLayout() {
    const [userLink, setUserLink] = useState(1)


    return (
        <>
            <div className={styles.dashboardLayout}>
                <ul>
                    <li><Link to={`/dashboard/${userLink}`} >User {userLink}</Link></li>
                </ul>
                <input type="number" inputMode="numeric"
                    value={userLink}
                    onChange={(e) => setUserLink(e.target.value)}
                /> 
            </div>
            
            <Outlet />
            
        </>
    )
}

export default DashboardLayout