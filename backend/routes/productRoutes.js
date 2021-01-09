import express from 'express'
const router = express.Router()
import {
	getProducts,
	getProductById,
} from '../controllers/productController.js'

// routes should just point to controller functions
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
