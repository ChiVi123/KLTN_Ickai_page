import { typeState } from '../variables';

export const getProductsAdmin = (state = typeState) => state.products.list;
export const getProduct = (state = typeState) => state.products.item;
