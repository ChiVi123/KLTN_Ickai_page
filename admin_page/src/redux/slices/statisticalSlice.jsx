import { createSlice } from '@reduxjs/toolkit';
import { getStatistical } from '../async_thunks/statisticalAsync';
import { statistical } from '../variables';

const { name, initialState } = statistical;
const statisticalSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: {
        [getStatistical.pending]: (state) => {
            state.isLoading = true;
        },
        [getStatistical.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.statisticalAmount = payload;
        },
        [getStatistical.rejected]: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const statisticalActions = statisticalSlice.actions;
export default statisticalSlice.reducer;
