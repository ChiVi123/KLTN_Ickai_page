import { createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '~/services';
import { request } from '~/utils';
import { logger } from '~/utils/logger';

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
export const search = createAsyncThunk(
    'users/search',
    async (
        { query = '', state = '', page = 0, size = 5 },
        { rejectWithValue },
    ) => {
        try {
            const result = await request.get('/admin/users/search', {
                params: { q: query, state, page, size },
            });

            logger({ groupName: 'api search user', values: [result] });

            return result.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
