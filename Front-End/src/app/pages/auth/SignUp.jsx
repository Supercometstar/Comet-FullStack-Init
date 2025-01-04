import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthInputGroup } from '@components'
import { authActions } from '@store'

const SignUp = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [ signUpInfo, setSignUpInfo ] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	})
	
	const handleSignUp = async () => {
		if (signUpInfo.password !== signUpInfo.passwordConfirm) {
			alert('Password confirm is not correct')
			return
		}
		if (Object.values(signUpInfo).includes('')) {
			alert('Input all info')
		}
		const response = await dispatch(authActions.signUp(signUpInfo))
	}

	return (
		<div>
			<AuthInputGroup label='Email' type='email' info={signUpInfo} setInfo={setSignUpInfo} />
			<AuthInputGroup label='Name' type='name' info={signUpInfo} setInfo={setSignUpInfo} />
			<AuthInputGroup label='Password' type='password' info={signUpInfo} setInfo={setSignUpInfo} />
			<AuthInputGroup label='Password Confirm' type='passwordConfirm' info={signUpInfo} setInfo={setSignUpInfo} />
			<button onClick={handleSignUp}>Sign Up</button>
			<Link to='/auth/sign-in'>Go to Sign in</Link>
		</div>
	)
}

export default SignUp