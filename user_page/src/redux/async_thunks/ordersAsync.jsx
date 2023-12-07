import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderServices } from '~/services';

export const getAllOrder = createAsyncThunk(
    'orders/getAllOrder',
    async (page, { rejectWithValue }) => {
        try {
            const result = await orderServices.getAllOrder(page);
            return result;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
