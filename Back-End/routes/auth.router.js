const express = require('express')

const { signIn, signUp, resetPassword, sendResetLink, verify, sendVerificationCode, autoSignIn, signOut, isUser, isVerified } = require('@controllers')

const authRouter = express.Router()



authRouter.route('/')
			.get(isUser, isVerified, autoSignIn)
			.post(signIn)
			.put(signUp, sendVerificationCode)
			.delete(signOut)

authRouter.route('/verify')
			.post(verify)

authRouter.route('/password')
			.post(sendResetLink)
			.patch(resetPassword)

module.exports = authRouter