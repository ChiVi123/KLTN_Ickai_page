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
        reset: (state) => {
            state.isLoading = false;
            state.message = '';
            state.status = 'pending';
            state.totalPage = 0;
            state.list = [];
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllOrder.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload.isChange) {
                state.items = payload?.list || [];
            } else {
                state.items =
                    (payload?.list && state.items.concat(payload.list)) || [];
            }
            state.list = state.items;
            state.totalPage = payload?.totalPage;
        });
        builder.addCase(getAllOrder.rejected, (state) => {
            state.isLoading = false;
            state.message = 'error';
        });
    },
});

export const orderHistoryActions = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
