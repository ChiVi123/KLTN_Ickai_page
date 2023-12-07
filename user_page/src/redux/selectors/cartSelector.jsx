import { typeState } from '../variables';

export const selectCart = (state = typeState) => {
    return state.cart;
};
export const selectTotalPrice = (state = typeState) => {
    return state.cart.totalPrice;
};
export const selectTotalProduct = (state = typeState) => {
    return state.cart.totalProduct;
};
export const stateCart = (state = typeState) => {
    return state.cart.isSuccess;
};
export const selectList = (state = typeState) => {
    return state.cart.items;
};
