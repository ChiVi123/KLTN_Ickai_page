import { createSlice } from '@reduxjs/toolkit';
import { keys } from '~/common';
import { getAllByCategoryId, getAllByQuery } from '../async_thunks/searchAsync';
import { search } from '../variables';

const sorts = {
    latest: () => {},
    sold: (a, b) => b.sold - a.sold,
    priceAsc: (a, b) => a.discount - b.discount,
    priceDesc: (a, b) => b.discount - a.discount,
};

const { name, initialState } = search;
const searchSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset(state) {
            state.items = [];
            state.message = '';
            state.totalPage = 0;
        },
    },
    extraReducers: (builder) => {
        // getAllByQuery
        builder.addCase(getAllByQuery.pending, (state) => {
            state.status = keys.pending;
            state.isLoading = true;
        });
        builder.addCase(getAllByQuery.fulfilled, (state, { payload }) => {
            const min = payload.minPrice;
            const max = payload.maxPrice || Infinity;
            const isInterval = (item) =>
                item.discount >= min && item.discount <= max;

            state.status = keys.fulfilled;
            state.isLoading = false;
            state.items = payload.items
                .sort(sorts[payload.sortBy])
                .filter(isInterval);
        });
        builder.addCase(getAllByQuery.rejected, (state, { payload }) => {
            state.status = keys.rejected;
            state.isLoading = false;
            state.items = [];
            state.message = payload;
        });

        // getAllByCategoryId
        builder.addCase(getAllByCategoryId.pending, (state) => {
            state.status = keys.pending;
            state.isLoading = true;
        });
        builder.addCase(getAllByCategoryId.fulfilled, (state, { payload }) => {
            const min = payload.minPrice;
            const max = payload.maxPrice || Infinity;
            const isInterval = (item) =>
                item.discount >= min && item.discount <= max;

            state.status = keys.fulfilled;
            state.isLoading = false;
            state.items = payload.items
                .sort(sorts[payload.sortBy])
                .filter(isInterval);
        });
        builder.addCase(getAllByCategoryId.rejected, (state, { payload }) => {
            state.status = keys.rejected;
            state.isLoading = false;
            state.items = [];
            state.message = payload;
        });
    },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
