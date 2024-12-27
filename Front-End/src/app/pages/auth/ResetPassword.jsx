import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthInputGroup } from '@components'
import { authActions } from '@store'

const ResetPassword = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [ resetInfo, setResetInfo ] = useState({
		password: '',
		passwordConfirm: ''
	})

	const handleReset = async () => {
		if (Object.values(resetInfo).includes('')) {
			alert('Input all info!')
			return
		}
		const response = await dispatch(authActions.resetPassword(resetInfo))
	}

	return (
		<div>
			<AuthInputGroup label='Password' type='password' info={resetInfo} setInfo={setResetInfo} />
			<AuthInputGroup label='Password Confirm' type='passwordConfirm' info={resetInfo} setInfo={setResetInfo} />
			<button onClick={handleReset}>Reset Password</button>
		</div>
	)
}

export default ResetPassword