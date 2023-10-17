import { createSlice } from '@reduxjs/toolkit';
import {
    getAllProductByClient,
    getProductById,
} from '../async_thunks/productsAsync';
import { products } from '../variables';

const { name, initialState } = products;
const productsSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset(state) {
            state.item = initialState.item;
        },
    },
    extraReducers: {
        // getProductById
        [getProductById.pending]: (state) => {
            state.item.isLoading = true;
        },
        [getProductById.fulfilled]: (state, { payload }) => {
            state.item.isLoading = false;
            state.item.id = payload.id;
            state.item.name = payload.name;
            state.item.sale = payload.sale;
            state.item.price = payload.price;
            state.item.images = payload.images;
            state.item.discount = payload.discount;
            state.item.quantity = payload.quantity;
            state.item.description = payload.description;
        },
        [getProductById.rejected]: (state, { payload }) => {
            state.item.message = 'error';
            state.item.isLoading = false;

            state.item.id = initialState.item.id;
            state.item.name = initialState.item.name;
            state.item.sale = initialState.item.sale;
            state.item.price = initialState.item.price;
            state.item.images = initialState.item.images;
            state.item.quantity = initialState.item.quantity;
            state.item.description = initialState.item.description;
        },

        // getAllProductByClient
        [getAllProductByClient.pending]: (state) => {
            state.client.isLoading = true;
        },
        [getAllProductByClient.fulfilled]: (state, { payload }) => {
            state.client.isLoading = false;
            state.client.items = payload.list;
            state.client.totalPage = payload.totalPage;
        },
        [getAllProductByClient.rejected]: (state, { payload }) => {
            state.client.message = 'error';
            state.client.isLoading = false;

            state.client = initialState.client;
        },
    },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
