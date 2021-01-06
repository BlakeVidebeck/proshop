import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

// env config
dotenv.config()

// db connect
connectDB()

const app = express()

app.get('/', (req, res) => {
	res.send('Hello')
})

// routes
app.use('/api/products', productRoutes)

// error handlers
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
	)
)
