import { createSlice } from '@reduxjs/toolkit';
import { getReviewByProductId } from '../async_thunks/reviewsAsync';
import { reviews } from '../variables';

const { name, initialState } = reviews;
const reviewsSlice = createSlice({
    name,
    initialState,
    reducers: {
        resetItem: (state) => {
            state.item.isLoading = false;
            state.item.list = [];
            state.item.totalPage = 0;
            state.item.totalQuantity = 0;
        },
    },
    extraReducers: {
        // getReviewByProductId
        [getReviewByProductId.pending]: (state) => {
            state.item.isLoading = true;
        },
        [getReviewByProductId.fulfilled]: (state, { payload }) => {
            state.item.isLoading = false;
            state.item.list = payload.list;
            state.item.totalPage = payload.totalPage;
            state.item.totalQuantity = payload.totalQuantity;
        },
        [getReviewByProductId.rejected]: (state) => {
            state.item.message = 'error';
            state.item.isLoading = false;
            state.item.list = [];
            state.item.totalPage = 0;
            state.item.totalQuantity = 0;
        },
    },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
