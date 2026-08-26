import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, Outlet, useLocation, useNavigation } from "react-router-dom"
import Loading from "../Components/Loading"

function GuestRoute() {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    const from = location.state?.from.pathname || "/"
    
    const navigation = useNavigation()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return <Navigate to={from} replace/>
    }

    return (navigation.state === "loading" ? <Loading /> : <Outlet />)
}

export default GuestRoute