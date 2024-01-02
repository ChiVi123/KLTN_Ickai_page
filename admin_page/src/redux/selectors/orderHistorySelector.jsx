import { typeState } from '../variables';

export const selectList = (state = typeState) => state.orderHistory.list;
export const selectCount = (state = typeState) => state.orderHistory.count;
export const selectStartDate = (state = typeState) =>
    state.orderHistory?.startDate;
