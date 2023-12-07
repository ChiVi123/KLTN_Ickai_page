import { createSlice } from '@reduxjs/toolkit';
import { getAllOrder } from '../async_thunks/ordersAsync';
import { orderHistory } from '../variables';

const { name, initialState } = orderHistory;
const orderHistorySlice = createSlice({
    name,
    initialState,
    reducers: {
        filter: (state, { payload }) => {
            state.items = state.list.filter((item) =>
                payload ? item.state === payload : true,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllOrder.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.list = payload.list;
            state.items = payload.list;
        });
        builder.addCase(getAllOrder.rejected, (state) => {
            state.message = 'error';
        });
    },
});

export const orderHistoryActions = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
