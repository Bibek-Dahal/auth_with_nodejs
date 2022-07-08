import express from 'express'
const router = express.Router()
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { validations } from '../middlewares/vlaidations.js'
import User from '../models/User.js'


//public routes
router.post('/register',[validations.register,UserController.register])
router.post('/login',[validations.login,UserController.login])

//sneds password reset email to user
router.post('/password-reset',[validations.passwordResetEmail,UserController.passwordResetEmail])

router.post('/password-reset/:userId/:token',UserController.passwordReset)

//protected routes

router.put('/password-change',[authMiddleware,validations.passwordChange,UserController.passwordChange])

export default router