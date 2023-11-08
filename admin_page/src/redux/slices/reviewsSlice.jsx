import { createSlice } from '@reduxjs/toolkit';
import { getAllReview } from '../async_thunks/reviewsAsync';
import { reviews } from '../variables';

const { name, initialState } = reviews;
const reviewsSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.list = [];
            state.totalPage = 0;
            state.totalQuantity = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllReview.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(getAllReview.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.status = 'fulfilled';
            state.items = payload.list;
            state.totalPage = payload.totalPage;
        });
        builder.addCase(getAllReview.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.status = 'rejected';
            state.message = payload;
            state.items = payload.list;
            state.totalPage = payload.totalPage;
        });
    },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
