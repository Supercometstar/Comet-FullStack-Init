const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		unique: true,
		lowercase: true,
		trim: true,
		match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address.']
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
		minlength: [8, 'Password must be at least 8 characters long.']
	},
	isVerified: Boolean,
	verificationCode: String,
	verificationCodeExpires: Date,
	passwordResetToken: String,
	passwordResetTokenExpires: Date
},{
	timestamps: true
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (e) {
		next(e)
	}
})

userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User