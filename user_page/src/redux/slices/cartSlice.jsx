import { createSlice } from '@reduxjs/toolkit';
import { getCartByToken } from '../async_thunks/cartAsync';
import { cart } from '../variables';

const { name, initialState } = cart;
const cartSlice = createSlice({
    name,
    initialState,
    reducers: {
        addProduct(state, { payload }) {
            state.total += payload.price * payload.quantity;
            state.items = [...state.items, payload];
        },
        removeProduct(state, { payload }) {
            state.items = state.items.filter(
                (item) => item.productId !== payload,
            );
        },
        plusQuantityProduct(state, { payload }) {
            const product = state.items.find(
                (item) => item.productId === payload,
            );

            product.quantity += 1;
        },
        subtractQuantityProduct(state, { payload }) {
            const product = state.items.find(
                (item) => item.productId === payload,
            );

            product.quantity -= 1;
        },
        changeQuantityProduct(state, { payload }) {
            const product = state.items.find(
                (item) => item.productId === payload.id,
            );

            product.quantity = payload.quantity;
        },
        resetCart(state) {
            state.items = [];
            state.total = 0;
            state.totalProduct = 0;
        },
        increaseQuantity(state) {
            state.totalProduct += 1;
        },
        decreaseQuantity(state) {
            state.totalProduct -= 1;
        },
    },
    extraReducers: {
        [getCartByToken.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartByToken.fulfilled]: (state, { payload: { data } }) => {
            state.isLoading = false;
            state.items = data.items || [];
            state.totalProduct = data.totalProduct;
            state.totalPrice = data.totalPrice;
        },
        [getCartByToken.rejected](state) {
            state.items = [];
            state.totalProduct = 0;
            state.totalPrice = 0;
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
