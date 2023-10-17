import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryServices } from '~/services';

export const getAllCategory = createAsyncThunk(
    'categories/getAllCategory',
    async (_, { rejectWithValue }) => {
        try {
            const result = await categoryServices.getCategories();
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
