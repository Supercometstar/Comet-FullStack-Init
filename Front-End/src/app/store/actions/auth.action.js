import { setAuth, removeAuth } from '@store'
import { cometAPI } from '@utils'

export const verify = (data) => async dispatch => {
  const response = await cometAPI('post', '/api/auth/verify', data)
  if (response) {
    dispatch(setAuth(response))
    localStorage.setItem('token', response.token)
  }
  return response
}

export const signIn = (data) => async dispatch => {
  const response = await cometAPI('post', '/api/auth', data);  
  if (response) {
    dispatch(setAuth(response));
    localStorage.setItem('token', response.token);
  }
  return response
};

export const signUp = (data) => async dispatch => {
  const response = await cometAPI('put', '/api/auth', data);
  return response
};

export const signOut = () => async dispatch => {
  const response = await cometAPI('delete', '/api/auth')
  if (response) {
    dispatch(removeAuth())
    localStorage.removeItem('token')
  }
  return response
}

export const autoSignIn = () => async dispatch => {
  const response = await cometAPI('get', '/api/auth')
  if (response) {
    dispatch(setAuth(response))
    localStorage.setItem('token', response.token)
  }
  return response
}

export const forgotPassword = (data) => async dispatch => {
  const response = await cometAPI('post', '/api/auth/password', data)
  if (response) {

  }
  return response
}

export const resetPassword = (data) => async dispatch => {
  const response = await cometAPI('patch', '/api/auth/password', data)
  if (response) {

  }
  return response
}