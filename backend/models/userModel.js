import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
)

// create this method that compares the entered password from the login form to the password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
	// (this) makes it so you can access the specific users fields
	return await bcrypt.compare(enteredPassword, this.password)
}

// want this to happen pre save (user.Create())
userSchema.pre('save', async function (next) {
	// check to see if password is modified. if it has not been modified then run next
	if (!this.isModified('password')) {
		next()
	}
	// if password has been modified then
	// hash the password so its encrypted
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
