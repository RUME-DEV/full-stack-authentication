import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Welcome from "../Components/Welcome";


function User() {
    const user = useLoaderData()


    return (
        <>
            <Welcome 
                username={user.username} 
                id={user.id}
                name={user.name}
                email={user.email}
            />
        </>
    )
}

export default User