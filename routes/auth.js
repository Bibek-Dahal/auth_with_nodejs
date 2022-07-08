import express from 'express'
const router = express.Router()
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import User from '../models/User.js'


//public routes
router.post('/register',UserController.register)
router.post('/login',UserController.login)

//sneds password reset email to user
router.post('/password-reset',UserController.passwordResetEmail)

router.post('/password-reset/:userId/:token',UserController.passwordReset)

//protected routes

router.put('/password-change',[authMiddleware,UserController.passwordChange])

export default router