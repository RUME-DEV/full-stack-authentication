import express, { urlencoded } from 'express'
import dotenv from "dotenv"
import cors from "cors"
import conToDB from './config/db.js'
import route from './router/userroute.js'
import logRoute from './middleware/logroute.js'
import cookieParser from 'cookie-parser'

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(logRoute)

dotenv.config()
conToDB()



app.use('/user', route)




const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})