import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axios from 'axios'

import { baseURL } from '.'

export const withAuth = (route) => {
	
	const _ = () => {
		const auth = useSelector(store => store.auth)
		if (auth.isSigned || (route.isSigned === auth.isSigned)) {
			return route.element
		}else {
			return <Navigate to='/auth/sign-in' />
		}
	}
	return <_ />

}

export const getHeader = () => {

  const token = localStorage.getItem('token');
  if (token) return { Authorization: 'Bearer ' + token }
  else return {}

}

export const getErrorMessage = (error) => {  
  try {
    return error.response.data.message
  }catch {
    return error.message
  }
}

export const cometAPI = async (method, url, data={}) => {

  const api = axios.create({ baseURL });

  try {
    
    let response
    if ([ 'get', 'delete' ].includes(method)) response = await api[method](url, { headers: getHeader() });
    else response = await api[method](url, data, { headers: getHeader() })
    console.log(response)
    return response.data

  } catch (error) {
    console.log(error)
    alert(getErrorMessage(error))
    return false

  }

};