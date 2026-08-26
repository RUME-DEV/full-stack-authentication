import { redirect } from "react-router-dom"

export const dashboardFormHandler = async ({ request }) => {
    const formData = await request.formData()

    const name = formData.get('name')

    if(!name) {
        throw new Response("Name Is Required", {status: 400})
    }
    // await new Promise(resolve => setTimeout(resolve, 2000))
    const res = await fetch('http://localhost:4000/user/getdata', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Response(data?.message, {status: res.status})
    }

    console.log(data.message)

    return {message: data.message}
    // return redirect("/dashboard")
}