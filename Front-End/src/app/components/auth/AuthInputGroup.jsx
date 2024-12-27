const AuthInputGroup = ({ label, type, info, setInfo }) => {

	const handleChange = (e) => {
		info[type] = e.target.value
		setInfo({ ...info })
	}

	return (
		<div>
			<p>{label}</p>
			<input onChange={handleChange} />
		</div>
	)
}

export default AuthInputGroup