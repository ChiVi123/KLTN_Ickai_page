import { createAsyncThunk } from '@reduxjs/toolkit';
import { productServices, searchServices } from '~/services';

export const getAllByQuery = createAsyncThunk(
    'search/getAllByQuery',
    async ({ query, sortBy, minPrice, maxPrice }, { rejectWithValue }) => {
        try {
            const items = await searchServices.getProducts(query);
            return { items, sortBy, minPrice, maxPrice };
        } catch (error) {
            return rejectWithValue(error.error?.response?.data?.message);
        }
    },
);
export const getAllByCategoryId = createAsyncThunk(
    'search/getAllByCategoryId',
    async ({ categoryId, sortBy, minPrice, maxPrice }, { rejectWithValue }) => {
        try {
            const items = await productServices.getAllByCategory(categoryId);
            return { items, sortBy, minPrice, maxPrice };
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
