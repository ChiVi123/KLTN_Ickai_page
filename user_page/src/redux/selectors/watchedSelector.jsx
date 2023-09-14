import { typeState } from '../variables';

export const selectListWatched = (state = typeState) => state.watched.list;
