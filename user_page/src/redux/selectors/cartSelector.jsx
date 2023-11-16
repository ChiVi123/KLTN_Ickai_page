import { typeState } from '../variables';

export const selectCart = (state = typeState) => state.cart;
export const selectTotalPrice = (state = typeState) => state.cart.totalPrice;
export const selectTotalProduct = (state = typeState) =>
    state.cart.totalProduct;
export const stateCart = (state = typeState) => state.cart.isSuccess;
export const selectList = (state = typeState) => state.cart.items;
