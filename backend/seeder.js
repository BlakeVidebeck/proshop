import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		// clear all collections from db
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		// insert the users into the db
		const createdUsers = await User.insertMany(users)
		// get the admin user._id that was created with mongo
		const adminUser = createdUsers[0]._id

		// make the admin._id the user for all the products
		const sampleProducts = products.map(product => {
			return { ...product, user: adminUser }
		})

		// insert the updated products into the db
		await Product.insertMany(sampleProducts)

		console.log('Data Imported!'.green.inverse)
		process.exit()
	} catch (err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		// clear all collections from db
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data Destroyed!'.red.inverse)
		process.exit()
	} catch (err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

// node backend/server -d
if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
