import {
	HomePage,
	NotFoundPage,
} from '@pages'

const commonRoutes = [
	{
		path: '/',
		element: <HomePage />,
		layout: 'main',
		isSigned: true,
	},
	{
		path: '/not-found',
		element: <NotFoundPage />,
		layout: 'main',
		isSigned: false,
	},
]

export default commonRoutes