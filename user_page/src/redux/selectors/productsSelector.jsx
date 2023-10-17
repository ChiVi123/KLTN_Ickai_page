import { typeState } from '../variables';

export const selectItem = (state = typeState) => state.products.item;
