import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Application from '../Components/Application'

function Dashboard() {

    const jobApplication = useLoaderData()



  return (
    <div>
        {!jobApplication && <p>Add An Application Above</p>}
  
        <Application 
 
          id={jobApplication?._id}
          company={jobApplication?.company}
          position={jobApplication?.position}
          status={jobApplication?.status}
          appliedDate={jobApplication?.appliedDate}

        />

        {
          jobApplication &&
          <Link to={"/applications"}>See All Job Applications {"->"}</Link>
        }
        

    </div>
  )
}



export default Dashboard