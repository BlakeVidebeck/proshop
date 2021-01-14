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
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCEESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_SUCCEESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	PRODUCT_UPDATE_REQUEST,
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

// create product
export const productCreateReducer = (state = {}, action) => {
	const { type, payload } = action

	switch (type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true, ...state }
		case PRODUCT_CREATE_SUCCEESS:
			return { loading: false, success: true, product: payload }
		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: payload }
		case PRODUCT_CREATE_RESET:
			return {}
		default:
			return state
	}
}

// update product
export const productUpdateReducer = (state = { product: {} }, action) => {
	const { type, payload } = action

	switch (type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true, ...state }
		case PRODUCT_UPDATE_SUCCEESS:
			return { loading: false, success: true, product: payload }
		case PRODUCT_UPDATE_FAIL:
			return { loading: false, error: payload }
		case PRODUCT_UPDATE_RESET:
			return { product: {} }
		default:
			return state
	}
}
