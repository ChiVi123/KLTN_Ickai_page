import { createSlice } from '@reduxjs/toolkit';
import { getAllOrderEnable, search } from '../async_thunks/ordersAsync';
import { orderHistory } from '../variables';

const { name, initialState } = orderHistory;
const orderHistorySlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrderEnable.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(getAllOrderEnable.fulfilled, (state, { payload }) => {
            state.items = payload.list;
            state.totalPage = payload.totalPage;
            state.isLoading = false;
            state.status = 'fulfilled';
        });
        builder.addCase(getAllOrderEnable.rejected, (state, { payload }) => {
            state.items = [];
            state.totalPage = 0;
            state.message = payload;
            state.isLoading = false;
            state.status = 'rejected';
        });

        builder.addCase(search.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.items = payload.list;
            state.totalPage = payload.totalPage;
            state.isLoading = false;
            state.status = 'fulfilled';
        });
        builder.addCase(search.rejected, (state, { payload }) => {
            state.items = [];
            state.totalPage = 0;
            state.message = payload;
            state.isLoading = false;
            state.status = 'rejected';
        });
    },
});

export const orderHistoryActions = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
