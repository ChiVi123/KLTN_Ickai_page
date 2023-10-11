import { typeState } from '../variables';

export const selectItem = (state = typeState) => state.reviews.item;
