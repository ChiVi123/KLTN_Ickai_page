import { createSlice } from '@reduxjs/toolkit';
import { keys } from '~/common';
import { getAllByCategoryId, getAllByQuery } from '../async_thunks/searchAsync';
import { search } from '../variables';

const { name, initialState } = search;
const searchSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset(state) {
            state.isLoading = false;
            state.items = [];
            state.message = '';
            state.status = keys.pending;
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
            const page = payload.page - 1;
            const size = payload.size;
            const start = page * size;
            const total = Math.ceil(payload.items.length / size);

            state.status = keys.fulfilled;
            state.isLoading = false;
            state.items = payload.items.slice(start, start + size);
            state.totalPage = total;
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
            const page = payload.page - 1;
            const size = payload.size;
            const start = page * size;
            const total = Math.ceil(payload.items.length / size);

            state.status = keys.fulfilled;
            state.isLoading = false;
            state.items = payload.items.slice(start, start + size);
            state.totalPage = total;
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
