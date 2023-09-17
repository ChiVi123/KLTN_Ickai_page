import { createSlice } from '@reduxjs/toolkit';
import { getReviewsByAdmin } from '../async_thunks/reviewsAsync';
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
        // getReviewsByAdmin
        [getReviewsByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [getReviewsByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [getReviewsByAdmin.rejected]: (state) => {
            state.admin.message = 'error';
        },
    },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
