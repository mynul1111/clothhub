import express from 'express'
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js'

const userRouter = express.Router()

// User Register
userRouter.post('/register', registerUser)

// User Login
userRouter.post('/login', loginUser)

// Admin Login
userRouter.post('/admin', adminLogin)

export default userRouter
