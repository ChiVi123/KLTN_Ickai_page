import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const getAllOrder = createAsyncThunk(
    'orders/getAllOrder',
    async (page, { rejectWithValue }) => {
        try {
            const response = await request.get(`orders/getallorder`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
