import { createAsyncThunk } from '@reduxjs/toolkit';
import { productServices } from '~/services';
import { request } from '~/utils';

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
export const search = createAsyncThunk(
    'products/search',
    async (
        { query, sortBy = '', minPrice, maxPrice, state, page, size },
        { rejectWithValue },
    ) => {
        try {
            const response = await request.get('admin/products/search', {
                params: { q: query, sortBy, minPrice, maxPrice, state },
            });
            return { list: response.data, page, size };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
