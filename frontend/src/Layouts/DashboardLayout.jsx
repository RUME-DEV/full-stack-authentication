import { useEffect, useState } from "react"
import { Form, Outlet, useActionData } from "react-router-dom"
import styles from "./Layout.module.css"


function DashboardLayout() {
    
    const data = useActionData()


    const [form, setForm] = useState({
        company: "",
        position: "",
        status: "",
        appliedDate: "",
        jobUrl: "",
        notes: ""
    })

    const inputChange = (e) => {
        const { name, value } = e.target

        setForm(f => ({...f, [name]: value}))
    }

    useEffect(() => {

        if (data?.status === 201) {
            setForm({
                company: "",
                position: "",
                status: "",
                appliedDate: "",
                jobUrl: "",
                notes: ""
            })
        }
    }, [data])


    useEffect(() => {
        console.log("DashboardLayout mounted")

        return () => {
            console.log("DAshboardLayout Unmounted")
        }
    }, [])


    return (
        <>
            <Form className={styles.jobApplicationForm} method="post">

                <p>{data?.message}</p>

                <input type="text" name="company" value={form.company} placeholder="Company*" onChange={inputChange} />

                <input type="text" name="position" value={form.position} placeholder="Position*" onChange={inputChange} />

                <select name="status" value={form.status} onChange={inputChange} required>
                    <option value="" disabled>Select Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                </select>

                <input type="date" name="appliedDate" value={form.appliedDate} onChange={inputChange} />

                <input type="text" name="jobUrl" value={form.jobUrl} placeholder="Job Url [Optional]" onChange={inputChange} />

                <textarea name="notes" placeholder="Notes [Optional]" value={form.notes} onChange={inputChange} ></textarea>


                <button type="submit">Add Application</button>

            </Form>
            
            <Outlet />
            
        </>
    )
}

export default DashboardLayout