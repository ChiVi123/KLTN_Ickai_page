import { typeState } from '../variables';

export const selectCount = (state = typeState) => state.users.count;
export const selectInfo = (state = typeState) => state.users.item;
export const selectList = (state = typeState) => state.users.list;
