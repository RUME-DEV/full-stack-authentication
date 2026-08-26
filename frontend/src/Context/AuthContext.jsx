import { createContext, useState, useEffect } from "react"
import { Outlet } from "react-router-dom"


export const AuthContext = createContext()

function AuthProvider() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getCurrentUser = async() => {
        try {
            const res = await fetch('http://localhost:4000/user/me', {
                credentials: "include"
            })
    
            const data = await res.json()
    
            if (res.ok) {
                const currentUser = data.user
                setUser(currentUser)
            } else {
                setUser(null)
            }
        } catch(err) {
            console.log(err)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect( () => {
        getCurrentUser()
    }, [])


    return (
        <AuthContext.Provider value={{user, setUser, loading, getCurrentUser}}>
            <Outlet />
        </AuthContext.Provider>
    )
}


export  default AuthProvider