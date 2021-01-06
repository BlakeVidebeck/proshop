import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCEESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCEESS,
	PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

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
