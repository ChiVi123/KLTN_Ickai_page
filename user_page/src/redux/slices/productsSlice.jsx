import { createSlice } from '@reduxjs/toolkit';
import { getProductById } from '../async_thunks/productsAsync';
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
    extraReducers: (builder) => {
        builder.addCase(getProductById.pending, (state) => {
            state.item.isLoading = true;
        });
        builder.addCase(getProductById.fulfilled, (state, { payload }) => {
            state.item.isLoading = false;
            state.item.id = payload.id;
            state.item.name = payload.name;
            state.item.sale = payload.sale;
            state.item.price = payload.price;
            state.item.images = payload.images;
            state.item.discount = payload.discount;
            state.item.quantity = payload.quantity;
            state.item.description = payload.description;
        });
        builder.addCase(getProductById.rejected, (state) => {
            state.item.message = 'error';
            state.item.isLoading = false;

            state.item.id = initialState.item.id;
            state.item.name = initialState.item.name;
            state.item.sale = initialState.item.sale;
            state.item.price = initialState.item.price;
            state.item.images = initialState.item.images;
            state.item.quantity = initialState.item.quantity;
            state.item.description = initialState.item.description;
        });
    },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
