const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

exports.log = (_) => {
	console.log(_)
}

exports.catchAsync = (fn) => {
	return (req, res, next) => 
		Promise
			.resolve(fn(req, res, next))
			.catch(next)
}

class AppError extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
		this.status = statusCode.toString().startsWith('4')?'fail':'error'
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

exports.AppError = AppError

exports.errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err

	console.log(statusCode, message, err.code)

	if (!statusCode) statusCode = 500
	if (!message) message = 'Something went wrong'

	if (err.name === 'ValidationError') {
		statusCode = 400
		message = Object.values(err.errors).map(val => val.message).join(', ')
	}

	if (err.code === 11000) {
		statusCode = 400
		message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`
	}

	res.status(statusCode).json({
		success: false,
		message
	})

}

exports.createToken = (id) => {

	console.log(id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN, jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	}))

	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
}

exports.parseToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}

exports.transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	}
})