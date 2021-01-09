import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
	const { type, payload } = action
	switch (type) {
		case CART_ADD_ITEM:
			const item = payload

			// find if the item exists in the cart already
			const existItem = state.cartItems.find(x => x.product === item.product)

			// if the item does exist then map through the cart and find the two ids that match
			// then return the item from the payload else return x
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(x =>
						x.product === existItem.product ? item : x
					),
				}
			} else {
				// if it doesnt exist just push it to the array
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				// return all the items that does not eqaul the id passed in
				cartItems: state.cartItems.filter(x => x.product !== payload),
			}
		default:
			return state
	}
}
