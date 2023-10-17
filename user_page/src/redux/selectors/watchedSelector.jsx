import { typeState } from '../variables';

export const selectList = (state = typeState) => state.watched.list;
