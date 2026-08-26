import express from "express"
import { registerUser, loginUser, deleteUser, getCurrentUser, logOut, sendData } from "../controller/usercontroller.js"
import { apiValidateToken } from "../middleware/validateToken.js"

const route = express.Router()


route.post('/register', registerUser)
route.post('/login', loginUser)
route.delete('/delete', apiValidateToken, deleteUser)
route.get('/me', apiValidateToken, getCurrentUser)
route.get('/logout', logOut)
route.post('/getdata', sendData)


export default route