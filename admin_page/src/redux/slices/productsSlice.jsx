import { createSlice } from '@reduxjs/toolkit';
import { logger } from '~/utils/logger';
import { getAllState, getById } from '../async_thunks/productsAsync';
import { products } from '../variables';

const isLogger = false;
const { name, initialState } = products;
const productsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: {
        // getById
        [getById.pending]: (state) => {
            state.item.isLoading = true;
        },
        [getById.fulfilled]: (state, { payload }) => {
            state.item.isLoading = false;
            state.item.id = payload.id;
            state.item.name = payload.name;
            state.item.sale = payload.sale;
            state.item.tags = payload.tags;
            state.item.price = payload.price;
            state.item.images = payload.images;
            state.item.summary = payload.summary;
            state.item.options = payload.options;
            state.item.quantity = payload.quantity;
            state.item.description = payload.description;
        },
        [getById.rejected]: (state, { payload }) => {
            state.item.message = 'error';
        },

        // getAllState
        [getAllState.pending]: (state) => {
            state.admin.isLoading = true;

            if (isLogger) {
                logger({ groupName: productsSlice.name, values: [state] });
            }
        },
        [getAllState.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [getAllState.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },
    },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
