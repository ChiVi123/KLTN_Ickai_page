import { typeState } from '../variables';

export const selectInfo = (state = typeState) => state.user.item;
export const selectList = (state = typeState) => state.user.list;
