import { typeState } from '../variables';

export const getAllCategory = (state = typeState) => state.categories.items;
export const getCategoriesState = (state = typeState) => state.categories;
