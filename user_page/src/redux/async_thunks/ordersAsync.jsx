import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const getAllOrder = createAsyncThunk(
    'orders/getAllOrder',
    async ({ state, page, size = 5, isChange }, { rejectWithValue }) => {
        try {
            const response = await request.get(`orders/getallorder`, {
                params: { state, page, size },
            });
            return { ...response.data, isChange };
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
