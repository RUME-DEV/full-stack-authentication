import axios from 'axios'


const JOBAPI = axios.create({
    baseURL: "http://localhost:4000/job",

    withCredentials: true
})



export default JOBAPI