import axios from 'axios'
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_RESET,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

// User login
export const login = (email, password) => async (dispatch) => {
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

// User logout
export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
	dispatch({ type: USER_LIST_RESET })
}

// User register
export const register = (name, email, password) => async (dispatch) => {
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

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		})

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend to get the user object & token
		const { data } = await axios.get(`/api/users/${id}`, config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// update user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		})

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend to get the user object & token
		const { data } = await axios.put(`/api/users/profile`, user, config)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// list users
export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST })

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend to get the users
		const { data } = await axios.get(`/api/users`, config)

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// list users
export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST })

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend to delete the user
		await axios.delete(`/api/users/${id}`, config)

		dispatch({
			type: USER_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Update a user
export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST })

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend to update the user
		const { data } = await axios.put(`/api/users/${user._id}`, user, config)

		dispatch({
			type: USER_UPDATE_SUCCESS,
		})
		// will update the user details with the new data from updated user
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
