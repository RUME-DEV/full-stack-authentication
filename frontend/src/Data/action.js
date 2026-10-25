import { redirect, useRevalidator } from "react-router-dom"
import JOBAPI from "../API.js"



// Create A Job Application

const dashboardFormHandler = async ({ request }) => {
    try {

        const formData = await request.formData()
    
        const form = {
            company: formData.get("company"),
            position: formData.get("position"),
            status: formData.get("status"),
            appliedDate: formData.get("appliedDate"),
            jobUrl: formData.get("jobUrl"),
            notes: formData.get("notes")
        }
    
        const res = await JOBAPI.post("/application", form)

        return {...res.data, status: res.status}

    } catch(err) {

        const message = err.response?.data?.message || err.message || "Could Not Add JOb Application"

        return {message}

    }
}




// Edit An Application

const editApplication = async({ params, request }) => {
    try {
        
        const formData = await request.formData()
        const { id } = params

        const form = {
            company: formData.get('company'),
            position: formData.get("position"),
            status: formData.get("status"),
            appliedDate: formData.get("appliedDate"),
            jobUrl: formData.get("jobUrl"),
            notes: formData.get("notes")
        }

        const res = await JOBAPI.put(`/application/${id}`, form)

        return redirect('/applications')
    } catch(err) {

        const message = err.response?.data?.message || err.message || "Could Not Update Application"

        const status = err.response?.status || 500

        throw new Response(message, { status })
    }
}





export { dashboardFormHandler, editApplication } 