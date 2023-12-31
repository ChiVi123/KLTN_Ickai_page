import { createSlice } from '@reduxjs/toolkit';
import { user } from '../variables';

const { name, initialState } = user;
const userSlice = createSlice({
    name: name,
    initialState,
    reducers: {
        addUser(state, { payload }) {
            state.id = payload.id;
            state.email = payload.email;
            state.name = payload.name;
            state.avatar = payload.avatar;
            state.address = payload.address;
            state.phone = payload.phone;
            state.role = payload.role;
            state.accessToken = payload.accessToken;
        },
        updateUser(state, { payload }) {
            state.name = payload.name;
            state.phone = payload.phone;
        },
        updateAvatar(state, { payload }) {
            state.avatar = payload.avatar;
        },
        reset(state) {
            state.id = '';
            state.email = '';
            state.name = '';
            state.avatar = '';
            state.address = '';
            state.phone = '';
            state.role = '';
            state.accessToken = '';
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
