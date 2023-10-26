import { createAsyncThunk } from '@reduxjs/toolkit';
import { productServices } from '~/services';

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id, { rejectWithValue }) => {
        try {
            const result = await productServices.getProduct(id);
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
