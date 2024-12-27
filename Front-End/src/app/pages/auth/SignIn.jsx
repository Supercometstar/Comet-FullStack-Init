import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthInputGroup } from '@components'
import { authActions } from '@store'

const SignIn = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [ signInInfo, setSignInInfo ] = useState({
		email: '',
		password: '',
	})

	const handleSignIn = async () => {
		if (Object.values(signInInfo).includes('')) {
			alert('Input all info!')
			return
		}
		const response = await dispatch(authActions.signIn(signInInfo))
	}

	return (
		<div>
			<AuthInputGroup label='Email' type='email' info={signInInfo} setInfo={setSignInInfo} />
			<AuthInputGroup label='Password' type='password' info={signInInfo} setInfo={setSignInInfo} />
			<button onClick={handleSignIn}>Sign In</button>
		</div>
	)
}

export default SignIn