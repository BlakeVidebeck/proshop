import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCEESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCEESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCEESS,
	PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'

// get all products
export const productListReducer = (state = { products: [] }, action) => {
	const { type, payload } = action

	switch (type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] }
		case PRODUCT_LIST_SUCCEESS:
			return { loading: false, products: payload }
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: payload }
		default:
			return state
	}
}

// get one product
export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	const { type, payload } = action

	switch (type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state }
		case PRODUCT_DETAILS_SUCCEESS:
			return { loading: false, product: payload }
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: payload }
		default:
			return state
	}
}

// delete product
export const productDeleteReducer = (state = {}, action) => {
	const { type, payload } = action

	switch (type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true, ...state }
		case PRODUCT_DELETE_SUCCEESS:
			return { loading: false, success: true }
		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: payload }
		default:
			return state
	}
}
