import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoryByAdmin } from '../async_thunks/categoriesAsync';
import { categories } from '../variables';

const { name, initialState } = categories;
const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: {
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
