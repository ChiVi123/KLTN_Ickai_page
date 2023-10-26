import { createSlice } from '@reduxjs/toolkit';
import {
    getAllProductByCategory,
    getAllProductByQuery,
} from '../async_thunks/searchAsync';
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
        // getAllProductByQuery
        builder.addCase(getAllProductByQuery.pending, (state) => {
            state.status = 'pending';
            state.isLoading = true;
        });
        builder.addCase(
            getAllProductByQuery.fulfilled,
            (state, { payload }) => {
                const min = payload.minPrice;
                const max = payload.maxPrice || Infinity;
                const isInterval = (item) =>
                    item.discount >= min && item.discount <= max;

                state.status = 'fulfilled';
                state.isLoading = false;
                state.items = payload.items
                    .sort(sorts[payload.sortBy])
                    .filter(isInterval);
            },
        );
        builder.addCase(getAllProductByQuery.rejected, (state, { payload }) => {
            state.status = 'rejected';
            state.isLoading = false;
            state.items = [];
            state.message = payload;
        });

        // getAllProductByCategory
        builder.addCase(getAllProductByCategory.pending, (state) => {
            state.status = 'pending';
            state.isLoading = true;
        });
        builder.addCase(
            getAllProductByCategory.fulfilled,
            (state, { payload }) => {
                const min = payload.minPrice;
                const max = payload.maxPrice || Infinity;
                const isInterval = (item) =>
                    item.discount >= min && item.discount <= max;

                state.status = 'fulfilled';
                state.isLoading = false;
                state.items = payload.items
                    .sort(sorts[payload.sortBy])
                    .filter(isInterval);
            },
        );
        builder.addCase(
            getAllProductByCategory.rejected,
            (state, { payload }) => {
                state.status = 'rejected';
                state.isLoading = false;
                state.items = [];
                state.message = payload;
            },
        );
    },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
