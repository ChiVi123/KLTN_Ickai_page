import { createSlice } from '@reduxjs/toolkit';
import { getAllOrderEnableByAdmin } from '../async_thunks/ordersAsync';
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
        // getAllOrderEnableByAdmin
        [getAllOrderEnableByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
            state.admin.items = [];
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
