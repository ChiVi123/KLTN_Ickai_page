import { typeState } from '../variables';

export const selectCart = (state = typeState) => state.cart;
export const selectTotal = (state = typeState) => state.cart.totalProduct;
export const stateCart = (state = typeState) => state.cart.isSuccess;
