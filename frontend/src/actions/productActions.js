import axios from 'axios'

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCEESS,
	PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })

		// request to the backend for the products
		const { data } = await axios.get('/api/products')

		dispatch({ type: PRODUCT_LIST_SUCCEESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
