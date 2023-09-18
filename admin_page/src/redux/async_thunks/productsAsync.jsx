import { createAsyncThunk } from '@reduxjs/toolkit';
import { productServices } from '~/services';

export const getById = createAsyncThunk(
    'products/getById',
    async (id, { rejectWithValue }) => {
        try {
            const result = await productServices.getProduct(id);
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const getAllState = createAsyncThunk(
    'products/getAllState',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const result = await productServices.getProducts({
                page,
                size,
            });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
