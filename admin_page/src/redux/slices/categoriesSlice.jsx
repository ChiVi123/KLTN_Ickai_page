import { createSlice } from '@reduxjs/toolkit';
import { getAllEnable, getAllState } from '../async_thunks/categoriesAsync';
import { categories } from '../variables';

const { name, initialState } = categories;
const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: {
        // getAllEnable
        [getAllEnable.pending]: (state = initialState) => {
            state.client.isLoading = true;
        },
        [getAllEnable.fulfilled]: (state = initialState, { payload }) => {
            state.client.isLoading = false;
            state.client.items = payload;
            state.client.totalPage = 1;
        },
        [getAllEnable.rejected]: (state = initialState, { payload }) => {
            state.client.isLoading = false;
            state.client.message = payload;
        },

        // getAllState
        [getAllState.pending]: (state = initialState) => {
            state.admin.isLoading = true;
        },
        [getAllState.fulfilled]: (state = initialState, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload;
            state.admin.totalPage = 1;
        },
        [getAllState.rejected]: (state = initialState, { payload }) => {
            state.admin.isLoading = false;
            state.admin.message = payload;
        },
    },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
