import { createSlice } from '@reduxjs/toolkit';
import {
    getAllProductByAdmin,
    getAllProductByClient,
    getProductById,
} from '../async_thunks/productsAsync';
import { products } from '../variables';

const { name, initialState } = products;
const productsSlice = createSlice({
    name,
    initialState,
    reducers: {},
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
            state.item.tags = payload.tags;
            state.item.price = payload.price;
            state.item.images = payload.images;
            state.item.summary = payload.summary;
            state.item.options = payload.options;
            state.item.quantity = payload.quantity;
            state.item.description = payload.description;
        },
        [getProductById.rejected]: (state, { payload }) => {
            state.item.message = 'error';
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
        },

        // getAllProductByAdmin
        [getAllProductByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [getAllProductByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [getAllProductByAdmin.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },
    },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
