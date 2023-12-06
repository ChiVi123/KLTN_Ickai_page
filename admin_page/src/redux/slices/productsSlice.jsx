import { createSlice } from '@reduxjs/toolkit';
import { getById, search } from '../async_thunks/productsAsync';
import { products } from '../variables';

const { name, initialState } = products;
const productsSlice = createSlice({
    name,
    initialState,
    reducers: {
        resetList(state) {
            state.list.items = [];
            state.list.totalPage = 0;
        },
        resetItem(state) {
            state.item.name = '';
            state.item.sale = 0;
            state.item.price = 0;
            state.item.quantity = 0;
            state.item.category = '';
            state.item.category_id = '';
            state.item.description = '';
            state.item.images = [];
            state.item.state = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getById.pending, (state) => {
            state.item.status = 'pending';
        });
        builder.addCase(getById.fulfilled, (state, { payload }) => {
            state.item.status = 'fulfilled';

            state.item.id = payload.id;
            state.item.name = payload.name;
            state.item.sale = payload.sale;
            state.item.price = payload.price;
            state.item.quantity = payload.quantity;
            state.item.category = payload.category;
            state.item.category_id = payload.category_id;
            state.item.description = payload.description;
            state.item.images = payload.images;
            state.item.state = payload.state;
        });
        builder.addCase(getById.rejected, (state) => {
            state.item.status = 'rejected';
        });

        // Search
        builder.addCase(search.pending, (state) => {
            state.list.isLoading = true;
            state.list.status = 'pending';
        });
        builder.addCase(search.fulfilled, (state, { payload }) => {
            const page = payload.page - 1;
            const size = payload.size;
            const start = page * size;
            const total = Math.ceil(payload.list.length / size);

            state.list.isLoading = false;
            state.list.status = 'fulfilled';
            state.list.items = payload.list.slice(start, start + size);
            state.list.totalPage = total;
        });
        builder.addCase(search.rejected, (state, { payload }) => {
            state.list.isLoading = false;
            state.list.status = 'rejected';
            state.list.items = [];
            state.list.totalPage = 0;
            state.list.message = payload;
        });
    },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
