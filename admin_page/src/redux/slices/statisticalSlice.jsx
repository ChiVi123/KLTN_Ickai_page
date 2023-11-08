import { createSlice } from '@reduxjs/toolkit';
import { getStatistical } from '../async_thunks/statisticalAsync';
import { statistical } from '../variables';

const { name, initialState } = statistical;
const statisticalSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatistical.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(getStatistical.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.status = 'fulfilled';
            state.statisticalAmount = payload;
        });
        builder.addCase(getStatistical.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.status = 'rejected';
            state.message = payload;
        });
    },
});

export const statisticalActions = statisticalSlice.actions;
export default statisticalSlice.reducer;
