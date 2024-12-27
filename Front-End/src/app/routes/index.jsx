import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { MainLayout, SimpleLayout, AuthLayout } from '@layouts'
import { withAuth } from '@utils'

import routes from './routes'

const AppRouter = () => {

	const layouts = [
		{ type: 'auth', element: <AuthLayout /> },
		{ type: 'main', element: <MainLayout /> },
		{ type: 'simple', element: <SimpleLayout /> },
	]

	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				{
					layouts.map((layout, layout_idx) => (
						<Route element={layout.element} key={layout_idx}>
							{
								routes
									.filter((route) => route.layout === layout.type)
									.map((route, route_idx) => (
										<Route key={route_idx} path={route.path} element={withAuth(route)} key={route_idx} />
									))
							}
						</Route>		
					))
				}
				<Route path='*' element={<Navigate to='/not-found' />} />
			</Routes>
		</Router>
	)
}

export default AppRouter