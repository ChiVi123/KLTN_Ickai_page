import { createSlice } from '@reduxjs/toolkit';
import {
    getAllCategory,
    getAllCategoryByAdmin,
} from '../async_thunks/categoriesAsync';
import { categories } from '../variables';

const { name, initialState } = categories;
const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: {
        // getAllCategory
        [getAllCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.items = payload;
        },
        [getAllCategory.rejected]: (state, { payload }) => {
            state.message = payload;
        },

        // getAllCategoryByAdmin
        [getAllCategoryByAdmin.pending]: (state) => {
            state.isLoadingAdmin = true;
        },
        [getAllCategoryByAdmin.fulfilled]: (state, { payload }) => {
            state.isLoadingAdmin = false;
            state.itemsAdmin = payload;
        },
        [getAllCategoryByAdmin.rejected]: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
