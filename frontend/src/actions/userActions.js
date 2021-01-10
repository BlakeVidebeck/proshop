import axios from 'axios'
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => async dispatch => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// make a request to the backend to get the user object & token
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		// set the user object in local storage
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logout = () => dispatch => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async dispatch => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// make a request to the backend to get the user object & token
		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		)

		// first dispatch register success and then login success to redirect
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		// set the user object in local storage
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
