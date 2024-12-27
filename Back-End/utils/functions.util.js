const jwt = require('jsonwebtoken')

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
		error: message
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