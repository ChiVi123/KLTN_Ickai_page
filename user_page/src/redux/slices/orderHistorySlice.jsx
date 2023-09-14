import { createSlice } from '@reduxjs/toolkit';
import {
    getAllOrder,
    getAllOrderByAdmin,
    getAllOrderEnableByAdmin,
} from '../async_thunks/ordersAsync';
import { orderHistory } from '../variables';

const { name, initialState } = orderHistory;
const orderHistorySlice = createSlice({
    name,
    initialState,
    reducers: {
        filter: (state, { payload }) => {
            const newOrders = state.client.items.filter((item) =>
                payload ? item.state === payload : true,
            );
            state.clientFilter.items = newOrders;
        },
    },
    extraReducers: {
        // getAllOrder
        [getAllOrder.pending]: (state) => {
            state.client.isLoading = true;
            state.clientFilter.isLoading = true;
        },
        [getAllOrder.fulfilled]: (state, { payload }) => {
            state.client.isLoading = false;
            state.client.items = payload.list;

            state.clientFilter.isLoading = false;
            state.clientFilter.items = payload.list;
        },
        [getAllOrder.rejected]: (state, { payload }) => {
            state.client.message = 'error';
        },

        // getAllOrderByAdmin
        [getAllOrderByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [getAllOrderByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [getAllOrderByAdmin.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },

        // getAllOrderEnableByAdmin
        [getAllOrderEnableByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [getAllOrderEnableByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [getAllOrderEnableByAdmin.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },
    },
});

export const orderHistoryActions = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
