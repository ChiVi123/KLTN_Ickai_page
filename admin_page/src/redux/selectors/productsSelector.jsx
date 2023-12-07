import { typeState } from '../variables';

export const selectCount = (state = typeState) => state.products.count;
export const selectItem = (state = typeState) => state.products.item;
export const selectList = (state = typeState) => state.products.list;
export const selectMaxPrice = (state = typeState) => state.products.maxPrice;
