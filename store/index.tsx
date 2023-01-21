import { createStore, combineReducers } from 'redux';
import { cartData } from "./reducers/cartData";

const rootReducer = combineReducers({
    cartData: cartData
});

const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>

export default store;
