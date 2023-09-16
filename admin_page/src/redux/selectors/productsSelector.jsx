import { typeState } from "../variables";

export const getProductsAdmin = (state = typeState) => state.products.admin;
export const getProduct = (state = typeState) => state.products.item;
