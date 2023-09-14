import { createSlice } from '@reduxjs/toolkit';
import { watched } from '../variables';

const { name, initialState } = watched;
const watchedSlice = createSlice({
    name,
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            const isExist = state.list.find(
                (item) => item.name === payload.name,
            );

            if (!isExist) {
                state.list.unshift(payload);
            }

            if (state.list.length > 4) state.list.pop();
        },
        resetWatched: (state) => {
            state.list.length = 0;
        },
    },
});

export const watchedActions = watchedSlice.actions;
export default watchedSlice.reducer;
