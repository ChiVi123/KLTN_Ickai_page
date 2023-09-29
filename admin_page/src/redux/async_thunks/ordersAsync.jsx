import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderServices } from '~/services';

export const getAllOrderEnableByAdmin = createAsyncThunk(
    'orders/getAllOrderEnableByAdmin',
    async (page, { rejectWithValue }) => {
        try {
            const result = await orderServices.adminGetAllOrderEnable(page);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
