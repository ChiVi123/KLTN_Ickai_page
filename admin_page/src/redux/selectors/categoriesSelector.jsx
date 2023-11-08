import { typeState } from '../variables';

export const selectAllState = (state = typeState) => state.categories.allItem;
export const selectEnable = (state = typeState) =>
    state.categories.allItemEnabled;
