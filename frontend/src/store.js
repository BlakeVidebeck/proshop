import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers'
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListMyReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
})

// get the cart items from local storage if it exists else return empty array
const cartItemsFromStoage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

// get the user info from local storage if it exists else return null
const userInfoFromStoage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

// get the shipping address from local storage if it exists else return empty object
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}

// set the initial state of the app
const initialState = {
	cart: {
		cartItems: cartItemsFromStoage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStoage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
