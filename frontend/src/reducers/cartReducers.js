import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const Newitem = action.payload;
            const existItem = state.cartItems.find(x => x.product === Newitem.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? Newitem : x) // checking if the item is same or not
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, Newitem] //if the new item is totaly diffrent from the items that is in cartItem
                    //
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state, shippingAddress: action.payload
            };

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMetho: action.payload
            }
        default:
            return state;
    }
}