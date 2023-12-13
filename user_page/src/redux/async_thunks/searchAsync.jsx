import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const getAllByQuery = createAsyncThunk(
    'search/getAllByQuery',
    async (
        { query, sortBy, minPrice, maxPrice, page, size },
        { rejectWithValue },
    ) => {
        try {
            const response = await request.get('products/search', {
                params: { q: query, sortBy, minPrice, maxPrice },
            });
            return { items: response.data, page, size };
        } catch (error) {
            return rejectWithValue(error.error?.response?.data?.message);
        }
    },
);
export const getAllByCategoryId = createAsyncThunk(
    'search/getAllByCategoryId',
    async (
        { categoryId, sortBy, minPrice, maxPrice, page, size },
        { rejectWithValue },
    ) => {
        try {
            const response = await request.get('products/searchcategory', {
                params: {
                    id: categoryId,
                    sortBy,
                    minPrice,
                    maxPrice,
                    state: 'enable',
                },
            });
            return { items: response.data, page, size };
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
