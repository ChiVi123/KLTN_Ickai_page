import { createSlice } from '@reduxjs/toolkit';
import { getAllEnable, getAllState } from '../async_thunks/categoriesAsync';
import { categories } from '../variables';

const { name, initialState } = categories;
const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllEnable
        builder.addCase(getAllEnable.pending, (state) => {
            state.allItemEnabled.isLoading = true;
            state.allItemEnabled.status = 'pending';
        });
        builder.addCase(getAllEnable.fulfilled, (state, { payload }) => {
            state.allItemEnabled.isLoading = false;
            state.allItemEnabled.status = 'fulfilled';
            state.allItemEnabled.items = payload;
            state.allItemEnabled.totalPage = 1;
        });
        builder.addCase(getAllEnable.rejected, (state, { payload }) => {
            state.allItemEnabled.isLoading = false;
            state.allItemEnabled.status = 'rejected';
            state.allItemEnabled.items = [];
            state.allItemEnabled.totalPage = 0;
            state.allItemEnabled.message = payload;
        });

        // getAllState
        builder.addCase(getAllState.pending, (state) => {
            state.allItem.isLoading = true;
            state.allItem.status = 'pending';
        });
        builder.addCase(getAllState.fulfilled, (state, { payload }) => {
            state.allItem.isLoading = false;
            state.allItem.status = 'fulfilled';
            state.allItem.items = payload;
            state.allItem.totalPage = 1;
        });
        builder.addCase(getAllState.rejected, (state, { payload }) => {
            state.allItem.isLoading = false;
            state.allItem.status = 'rejected';
            state.allItem.items = [];
            state.allItem.totalPage = 0;
            state.allItem.message = payload;
        });
    },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
