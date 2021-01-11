import axios from 'axios'
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
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
		const { data } = await axios.post(`/api/orders`, order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
