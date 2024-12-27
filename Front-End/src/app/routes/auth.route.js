import { 
	SignUpPage,
	SignInPage,
	VerificationPage,
	ResetPasswordPage,
	ForgotPasswordPage,
} from '@pages'

const authRoutes = [
	{
		path: '/auth/sign-up',
		element: <SignUpPage />,
		layout: 'auth',
		isSigned: false,
	},
	{
		path: '/auth/sign-in',
		element: <SignInPage />,
		layout: 'auth',
		isSigned: false,
	},
	{
		path: '/auth/verify',
		element: <VerificationPage />,
		layout: 'auth',
		isSigned: false,
	},
	{
		path: '/auth/forgot-password',
		element: <ForgotPasswordPage />,
		layout: 'auth',
		isSigned: false,
	},
	{
		path: '/auth/reset-password',
		element: <ResetPasswordPage />,
		layout: 'auth',
		isSigned: false,
	},
]

export default authRoutes