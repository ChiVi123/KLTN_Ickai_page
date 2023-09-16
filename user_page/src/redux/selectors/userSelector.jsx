import { typeState } from '../variables';

export const getUser = (state = typeState) => state.user;
// export const getUsers = (state=typeState) => state.user.admin;
export const getUserId = (state = typeState) => state.user.id;
