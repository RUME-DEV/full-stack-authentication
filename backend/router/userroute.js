import express from "express"
import { registerUser, loginUser, deleteUser, getCurrentUser, logOut } from "../controller/usercontroller.js"
import { apiValidateToken } from "../middleware/validateToken.js"

const userRouter = express.Router()

// Routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.delete('/delete', apiValidateToken, deleteUser)
userRouter.get('/me', apiValidateToken, getCurrentUser)
userRouter.get('/logout', logOut)


export default userRouter