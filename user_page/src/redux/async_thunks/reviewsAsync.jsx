import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewServices } from '~/services';

export const getByProductId = createAsyncThunk(
    'reviews/getByProductId',
    async (id, { rejectWithValue }) => {
        try {
            const result = await reviewServices.getByProductId(id);
            return result;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
