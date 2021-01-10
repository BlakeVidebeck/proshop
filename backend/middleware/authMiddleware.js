import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
	let token

	// if there is a authorization token and it starts with Bearer
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// split the token at the space so Bearer is [0] and the token is [1]
			token = req.headers.authorization.split(' ')[1]
			// the decoded token will include the users ID
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			// find the user from the db using the id from decoded minus the password
			// and set it as the req.user to have access to it in all the protected routes
			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

export { protect }
