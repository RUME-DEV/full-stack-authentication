import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

function Error() {
    const error = useRouteError()
    console.log(error)

    // if (error.status === 404) {
    //     return (
    //         <div>
    //             <h1>Not Found</h1>
    //         </div>
    //     )
    // }

    // if (error.status === 400) {
    //     return (
    //         <div>
    //             <h1>Name Is Required</h1>
    //             <Link to={"/dashboard"}>Retry</Link>
    //         </div>
    //     )
    // }

    return (
        <div>
            <h1>{error.data ? error.data : "Something Went Wrong"}</h1>
            <Link to={"/dashboard"}>Retry</Link>
        </div>
    )
}

export default Error