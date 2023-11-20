import { createSlice } from '@reduxjs/toolkit';
import { getAllCategory } from '../async_thunks/categoriesAsync';
import { categories } from '../variables';

const { name, initialState } = categories;
const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCategory.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.items = payload;
        });
        builder.addCase(getAllCategory.rejected, (state, { payload }) => {
            state.message = payload;
        });
    },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
