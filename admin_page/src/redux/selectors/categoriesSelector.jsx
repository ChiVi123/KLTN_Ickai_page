import { typeState } from '../variables';

export const selectAllState = (state = typeState) => state.categories.admin;
export const selectEnable = (state = typeState) => state.categories.client;
