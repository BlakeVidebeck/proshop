import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// env config
dotenv.config()

// db connect
connectDB()

const app = express()

// accept json data in the body
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello')
})

// routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// send the client id to the front end by hitting this route
app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)

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
