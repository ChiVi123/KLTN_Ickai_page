import { typeState } from '../variables';

export const getCart = (state = typeState) => state.cart;
export const getTotalProduct = (state = typeState) => state.cart.totalProduct;
export const getProductQuantity = (state = typeState) =>
    state.cart.items.length;
export const stateCart = (state = typeState) => state.cart.isSuccess;
