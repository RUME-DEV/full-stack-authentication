import express, { urlencoded } from 'express'
import dotenv from "dotenv"
import cors from "cors"
import conToDB from './config/db.js'
import logRoute from './middleware/logroute.js'
import cookieParser from 'cookie-parser'
import userRouter from './router/userRoute.js'
import jobRouter from './router/jobRoute.js'

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



app.use('/user', userRouter)
app.use('/job', jobRouter)




const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})