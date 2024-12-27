const { User } = require('@models')
const { catchAsync, AppError } = require('@utils')

exports.signUp = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		return next(new AppError('Please provide all required fields', 400))
	}

	const user = await User.create({ name, email, password })

	res.status(201).json({
		success: true,
		data: user
	})

})

exports.signIn = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new AppError('Please provide all required fields', 400))
	}

	const user = await User.findOne({ email }).select('+password')
	if (!user) {
		return next(new AppError('Invalid email', 401))
	}

	if (!await User.comparePassword(password)) {
		return next(new AppError('Invalid password', 401))
	}

	// const token = 

})

exports.signOut = catchAsync(async (req, res, next) => {

})

exports.verify = catchAsync(async (req, res, next) => {

})

exports.forgotPassword = catchAsync(async (req, res, next) => {

})

exports.resetPassword = catchAsync(async (req, res, next) => {

})

exports.autoSignIn = catchAsync(async (req, res, next) => {

})

exports.isUser = catchAsync(async (req, res, next) => {

})

exports.isVerified = catchAsync(async (req, res, next) => {

})