import { typeState } from '../variables';

export const selectInfo = (state = typeState) => state.user;
export const selectId = (state = typeState) => state.user.id;
