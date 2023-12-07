import { typeState } from '../variables';

export const selectList = (state = typeState) => state.reviews.list;
export const selectCount = (state = typeState) => state.reviews.count;
