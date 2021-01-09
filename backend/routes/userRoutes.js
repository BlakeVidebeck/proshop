import express from 'express'
const router = express.Router()
import {
	authUser,
	registerUser,
	getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
// routes should just point to controller functions
router.post('/login', authUser)
// the protect middleware is going to run when we try hit this route
router.route('/profile').get(protect, getUserProfile)

export default router
