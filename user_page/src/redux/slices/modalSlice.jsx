import { createSlice } from '@reduxjs/toolkit';
import { modal } from '../variables';

const { name, initialState } = modal;
const modalSlice = createSlice({
    name,
    initialState,
    reducers: {
        toggleOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
    },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
