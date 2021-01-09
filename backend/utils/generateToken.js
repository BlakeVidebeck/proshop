import jwt from 'jsonwebtoken'

// takes in a user id as thats what we want to add as the payload in the token
const generateToken = id => {
	// payload, secret, [options]
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
