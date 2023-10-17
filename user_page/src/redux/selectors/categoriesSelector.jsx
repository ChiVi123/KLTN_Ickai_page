import { typeState } from '../variables';

export const selectItems = (state = typeState) => state.categories.items;
