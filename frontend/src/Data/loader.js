import JOBAPI from "../API.js"



// Fetch All Applications

const jobApplicationLoader = async() => {

    try {

        const res = await JOBAPI.get("/applications")

        return res.data
    } catch(err) {
        const message = err.response?.data?.message || err?.message || "Could Not Get Applications"

        const status = err.response?.status || 500

        throw new Response(message, { status })
    }
}




// Fetch Most Recent Application

const dashboardApplicationLoader = async() => {
    try {

        const res = await JOBAPI.get('application')

        return res.data
    } catch(err) {

        const message = err.response?.data?.message || err.message || "Could Not Get A Job Application"

        const status = err.response?.status || 500

        throw new Response(message, { status })
    }
}




// Fetch Specific Job Application By Id

const getApplication = async({ params }) => {
    try {

        const { id } = params

        const res = await JOBAPI.get(`/application/${id}`)

        return res.data
    } catch(err) {

        const message = err.response?.data?.message || err.message || "Cound Not Find An Application"

        const status = err.response?.data || 500

        throw new Response(message, { status })
    }
}








export { jobApplicationLoader, dashboardApplicationLoader, getApplication }