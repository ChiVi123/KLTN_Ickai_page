import { createSlice } from '@reduxjs/toolkit';
import { contentReviewStates } from '~/common/enums';
import { resolverPagination } from '~/utils/funcs';
import { count, search } from '../async_thunks/reviewsAsync';
import { reviews } from '../variables';

const { name, initialState } = reviews;
const reviewsSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset: (state) => {
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
            const { start, total } = resolverPagination({
                ...payload,
                length: payload.list.length,
            });
            state.list.isLoading = false;
            state.list.status = 'fulfilled';
            state.list.items = payload.list.slice(start, start + payload.size);
            state.list.totalPage = total;
        });
        builder.addCase(search.rejected, (state, { payload }) => {
            state.list.isLoading = false;
            state.list.status = 'rejected';
            state.list.message = payload;
            state.list.items = [];
            state.list.totalPage = 0;
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
                content: contentReviewStates[item.state],
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

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
