import { createSlice } from '@reduxjs/toolkit';
import { contentOrderStates } from '~/common/enums';
import { count, search } from '../async_thunks/ordersAsync';
import { orderHistory } from '../variables';

const { name, initialState } = orderHistory;
const orderHistorySlice = createSlice({
    name,
    initialState,
    reducers: {
        reset(state) {
            state.list.isLoading = false;
            state.list.items = [];
            state.list.message = '';
            state.list.status = 'pending';
            state.list.totalPage = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(search.pending, (state) => {
            state.list.isLoading = true;
            state.list.status = 'pending';
        });
        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.list.items = payload.list;
            state.list.totalPage = payload.totalPage;
            state.list.isLoading = false;
            state.list.status = 'fulfilled';
        });
        builder.addCase(search.rejected, (state, { payload }) => {
            state.list.items = [];
            state.list.totalPage = 0;
            state.list.message = payload;
            state.list.isLoading = false;
            state.list.status = 'rejected';
        });

        // Count State
        builder.addCase(count.pending, (state) => {
            state.count.isLoading = true;
            state.count.status = 'pending';
        });
        builder.addCase(count.fulfilled, (state, { payload }) => {
            state.count.isLoading = false;
            state.count.items = payload.map((item) => ({
                ...item,
                content: contentOrderStates[item.state],
            }));
            state.count.status = 'fulfilled';
        });
        builder.addCase(count.rejected, (state, { payload }) => {
            state.count.isLoading = false;
            state.count.message = payload;
            state.count.status = 'rejected';
        });
    },
});

export const orderHistoryActions = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
