// 404 error (not found) eg. /api/test
const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

// custom error handler
// every error that is thrown goes through this function
// err is first so you can overwrite the default error middleware
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	})
}

export { notFound, errorHandler }
