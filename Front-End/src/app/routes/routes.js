import authRoutes from './auth.route'
import commonRoutes from './common.route'

export default [
	...authRoutes,
	...commonRoutes
]