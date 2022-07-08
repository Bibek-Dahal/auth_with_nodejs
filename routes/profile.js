import express from 'express'
import ProfileController from '../controllers/ProfileController.js'
const router = express.Router()
import authMiddleware from '../middlewares/authMiddleware.js'
import User from '../models/User.js'

router.get('',[authMiddleware,ProfileController.profile])



export default router

