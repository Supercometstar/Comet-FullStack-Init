const { User } = require('@models')
const { catchAsync, AppError, createToken, parseToken, transporter } = require('@utils')

exports.signUp = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		return next(new AppError('Please provide all required fields', 400))
	}

	const user = await User.create({ name, email, password })

	req.user = user

	next()
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
	if (!await user.comparePassword(password)) {
		return next(new AppError('Invalid password', 401))
	}
	if (!user.isVerified) {
		return next(new AppError('User is not verified. Please verify your account.', 403))
	}

	const token = createToken(user._id)

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: true,
		maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
	})

	res.status(200).json({
		status: 'success',
		message: 'User signed in successfully',
		data: user
	})

})

exports.signOut = catchAsync(async (req, res, next) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		secure: true,
		expires: new Date(0)
	})

	res.status(200).json({
		status: 'success',
		message: 'You have been signed out',
	})
})

exports.verify = catchAsync(async (req, res, next) => {
	const { verificationCode, email } = req.body

	const user = await User.findOne({ 
		email,
		verificationCode, 
		verificationCodeExpires: { $gt: Date.now() }
	})
	if (!user) {
		return next(new AppError('Invalid or expired verification code', 400))
	}

	user.isVerified = true
	user.verificationCode = undefined
	user.verificationCodeExpires = undefined
	await user.save()

	res.status(200).json({
		status: 'success',
		message: 'Account verified successfully'
	})
})

exports.sendVerificationCode = catchAsync(async (req, res, next) => {
	const { email } = req.body

	const user = await User.findOne({ email })
	if (!user) {
		return next(new AppError('No user found with that email address', 404))
	}

	const verificationCode = Math.floor(100000 + Math.random() * 900000)
	const verificationCodeExpires = Date.now() + 10 * 60 * 1000

	user.verificationCode = verificationCode
	user.verificationCodeExpires = verificationCodeExpires
	await user.save()

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: user.email,
		subject: 'Your Verification Code',
		text: `Hello, \n\nYour verification code is: ${verificationCode}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.\n\nThank you!`
	}

	await transporter.sendMail(mailOptions)

	res.status(200).json({
		status: 'success',
		message: 'Verification code sent successfully'
	})
})

exports.sendResetLink = catchAsync(async (req, res, next) => {
	const { email } = req.body

	const user = await User.findOne({ email })
	if (!user) {
		return next(new AppError('No user found with that email address', 404))
	}

	const resetToken = crypto.randomBytes(32).toString('hex')

	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

	user.passwordResetToken = hashedToken
	user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000
	await user.save()

	const resetLink = `${resetToken}`

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: user.email,
		subject: 'Password Reset Link',
		text: `Hello, \n\nPlease use the following link to reset your password:\n\n${resetLink}\n\nThe link will expire in 1 hour.\n\nIf you did not request a password reset, please ignore this email.\n\nThank you!`
	}

	await transporter.sendMail(mailOptions)

	res.status(200).json({
		status: 'success',
		message: 'Password reset link sent successfully'
	})

})

exports.resetPassword = catchAsync(async (req, res, next) => {
	let { token } = req.body
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetTokenExpires: { $gt: Date.now() }
	})
	if (!user) {
		return next(new AppError('Token is invalid or has expired'), 400)
	}

	user.password = req.body.password
	user.passwordResetToken = undefined
	user.passwordResetTokenExpires = undefined
	await user.save()

	token = createToken(user._id)

	res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });

	res.status(200).json({
		status: 'success',
		message: 'Password reset successfully'
	})

})

exports.autoSignIn = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: req.user
	})
})

exports.isUser = catchAsync(async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt

	if (!token) {
		return next(new AppError('Not signed in', 401))
	}

	const decoded = parseToken(token)

	const user = await User.findById(decoded.id)
	if (!user) {
		return next(new AppError('The user belonging to this token no longer exists.', 401))
	}

	req.user = user
	next()

})

exports.isVerified = catchAsync(async (req, res, next) => {
	if (!req.user.isVerified) {
		return next(new AppError('User is not verified', 403))
	}
	next()
})