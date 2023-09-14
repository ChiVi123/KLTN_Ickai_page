import { typeState } from '../variables';

export const getOrdersClient = (state = typeState) => state.orders.clientFilter;
export const getOrdersAdmin = (state = typeState) => state.orders.admin;
