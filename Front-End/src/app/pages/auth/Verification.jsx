import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthInputGroup } from '@components'
import { authActions } from '@store'

const Verification = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [ verifyInfo, setVerifyInfo ] = useState({
		verifyCode: ''
	})

	const handleVerify = async () => {
		if (Object.values(verifyInfo).includes('')) {
			alert('Input all info!')
			return
		}
		const response = await dispatch(authActions.verify(verifyInfo))
	}

	return (
		<div>
			<AuthInputGroup label='Verification Code' type='verifyCode' info={verifyInfo} setInfo={setVerifyInfo} />
			<button onClick={handleVerify}>Verify</button>
		</div>
	)
}

export default Verification