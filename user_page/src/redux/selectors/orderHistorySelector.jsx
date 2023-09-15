import { typeState } from '../variables';

export const getOrdersClient = (state = typeState) =>
    state.orderHistory.clientFilter;
export const getOrdersAdmin = (state = typeState) => state.orderHistory.admin;
