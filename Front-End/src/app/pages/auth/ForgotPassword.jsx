import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthInputGroup } from '@components'
import { authActions } from '@store'

const ForgotPassword = () => {

	console.log(process)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [ forgotInfo, setForgotInfo ] = useState({
		email: ''
	})

	const handleRequest = async () => {
		if (Object.values(forgotInfo).includes('')) {
			alert('Input all info!')
			return
		}
		const response = await dispatch(authActions.forgotPassword(forgotInfo))
	}

	return (
		<div>
			<AuthInputGroup label='Email' type='email' info={forgotInfo} setInfo={setForgotInfo} />
			<button onClick={handleRequest}>Reset Request Link</button>
		</div>
	)
}

export default ForgotPassword