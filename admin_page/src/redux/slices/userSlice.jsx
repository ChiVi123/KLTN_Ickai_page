import { createSlice } from '@reduxjs/toolkit';
import { getUsers, search } from '../async_thunks/usersAsync';
import { user } from '../variables';

const { name, initialState } = user;
const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        addUser(state, { payload }) {
            state.item.id = payload.id;
            state.item.email = payload.email;
            state.item.name = payload.name;
            state.item.avatar = payload.avatar;
            state.item.address = payload.address;
            state.item.phone = payload.phone;
            state.item.role = payload.role;
            state.item.accessToken = payload.accessToken;
        },
        resetUser(state) {
            state.item.id = '';
            state.item.email = '';
            state.item.name = '';
            state.item.avatar = '';
            state.item.address = '';
            state.item.phone = '';
            state.item.role = '';
            state.item.accessToken = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.list.isLoading = true;
            state.list.status = 'pending';
        });
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.list.isLoading = false;
            state.list.items = payload.list;
            state.list.totalPage = payload.totalPage;
            state.list.status = 'fulfilled';
        });
        builder.addCase(getUsers.rejected, (state, { payload }) => {
            state.list.message = payload;
            state.list.status = 'rejected';
        });

        builder.addCase(search.pending, (state) => {
            state.list.isLoading = true;
            state.list.status = 'pending';
        });
        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.list.isLoading = false;
            state.list.items = payload.list;
            state.list.totalPage = payload.totalPage;
            state.list.status = 'fulfilled';
        });
        builder.addCase(search.rejected, (state, { payload }) => {
            state.list.isLoading = false;
            state.list.items = [];
            state.list.totalPage = 0;
            state.list.message = payload;
            state.list.status = 'rejected';
        });
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
