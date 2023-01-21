const initialState = {
    cartItems: [],
    totalSum: null,
};

const REFRESH_DATA = 'REFRESH_DATA';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SET_QUANTITY = 'SET_QUANTITY';

export function cartData(state = initialState, action) {
    switch(action.type) {

        case REFRESH_DATA:
            return {...state, cartItems: action.payload};

        case REMOVE_ITEM:
            const { removedItemId } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== removedItemId)
            };

        case SET_QUANTITY:
            const { changedCountItemId, newCount} = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === changedCountItemId
                        ? {...item, count: newCount}
                        : item
                )
            };

        default:
            return state;
    }
};


export const setCartDataOnRefresh = (payload) => ({type: REFRESH_DATA, payload: payload});
export const setCartItemQuantity = (payload) => ({type: SET_QUANTITY, payload: payload});
export const removeCartItem = (payload) => ({type: REMOVE_ITEM, payload: payload})

