import { createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '~/services';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (data = { page: 1, size: 1 }, { rejectWithValue }) => {
        try {
            const result = await userServices.getUsers(data);

            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
