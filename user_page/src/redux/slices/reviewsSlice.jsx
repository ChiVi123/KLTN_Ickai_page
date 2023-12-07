import { createSlice } from '@reduxjs/toolkit';
import { keys } from '~/common';
import { getByProductId } from '../async_thunks/reviewsAsync';
import { reviews } from '../variables';

const { name, initialState } = reviews;
const reviewsSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset: (state) => {
            state.item.isLoading = false;
            state.item.list = [];
            state.item.totalPage = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getByProductId.pending, (state) => {
            state.item.isLoading = true;
            state.item.status = keys.pending;
        });
        builder.addCase(getByProductId.fulfilled, (state, { payload }) => {
            state.item.isLoading = false;
            state.item.list = payload.list;
            state.item.totalPage = payload.totalPage;
            state.item.status = keys.fulfilled;
        });
        builder.addCase(getByProductId.rejected, (state, { payload }) => {
            state.item.isLoading = false;
            state.item.list = [];
            state.item.totalPage = 0;
            state.item.message = payload;
            state.item.status = keys.rejected;
        });
    },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
