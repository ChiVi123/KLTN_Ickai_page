import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../async_thunks/usersAsync';
import { user } from '../variables';

const { name, initialState } = user;
const userSlice = createSlice({
    name,
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
        resetUser(state) {
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
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [getUsers.rejected]: (state, { payload }) => {
            state.admin.message = 'rejected';
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
