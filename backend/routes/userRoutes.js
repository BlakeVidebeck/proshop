import express from 'express'
const router = express.Router()
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// routes should just point to controller functions
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
// the protect middleware is going to run when we try hit this route
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

export default router
