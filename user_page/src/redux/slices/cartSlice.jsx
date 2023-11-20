import { createSlice } from '@reduxjs/toolkit';
import { getByToken } from '../async_thunks/cartAsync';
import { cart } from '../variables';

const { name, initialState } = cart;
const cartSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset(state) {
            state.items = [];
            state.total = 0;
            state.totalProduct = 0;
        },
        increased(state) {
            state.totalProduct += 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getByToken.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getByToken.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.items = payload.items || [];
            state.totalProduct = payload.totalProduct;
            state.totalPrice = payload.totalPrice;
        });
        builder.addCase(getByToken.rejected, (state) => {
            state.items = [];
            state.totalProduct = 0;
            state.totalPrice = 0;
        });
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
