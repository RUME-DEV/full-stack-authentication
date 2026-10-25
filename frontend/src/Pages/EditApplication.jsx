import React, { useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import styles from './Pages.module.css'

function EditApplication() {

    const editData = useLoaderData()

    const [form, setForm] = useState({
        ...editData,
        appliedDate: editData.appliedDate?.slice(0, 10) || "",
        jobUrl: editData.jobUrl || "",
        notes: editData.notes || ""
    })


    const inputChange = (e) => {
        const { name, value } = e.target

        setForm(f => ({...f, [name]: value}))
    }


  return (
    <Form className={styles.jobApplicationForm} method="post">

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


        <button type="submit">Save Changes</button>

    </Form>
  )
}

export default EditApplication