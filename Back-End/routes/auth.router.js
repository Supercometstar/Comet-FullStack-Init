const express = require('express')

const { signIn, signUp, resetPassword, forgotPassword, verify, autoSignIn, signOut, isUser, isVerified } = require('@controllers')

const authRouter = express.Router()

authRouter.route('/')
			.get(isUser, isVerified, autoSignIn)
			.post(signIn)
			.put(signUp)
			.delete(signOut)

authRouter.route('/verify')
			.post(isUser, verify)

authRouter.route('/password')
			.post(forgotPassword)
			.patch(resetPassword)

module.exports = authRouter