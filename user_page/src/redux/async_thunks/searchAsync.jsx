import { createAsyncThunk } from '@reduxjs/toolkit';
import { productServices, searchServices } from '~/services';
import { logger } from '~/utils/logger';

export const getAllProductByQuery = createAsyncThunk(
    'search/getAllProductByQuery',
    async ({ query, sortBy, minPrice, maxPrice }, { rejectWithValue }) => {
        try {
            const items = await searchServices.getProducts(query);
            return { items, sortBy, minPrice, maxPrice };
        } catch (error) {
            logger({ groupName: 'Search Async', values: [error] });
            return rejectWithValue(error.response.data);
        }
    },
);
export const getAllProductByCategory = createAsyncThunk(
    'search/getAllProductByCategory',
    async ({ categoryId, sortBy, minPrice, maxPrice }, { rejectWithValue }) => {
        try {
            const items = await productServices.getAllByCategory(categoryId);
            return { items, sortBy, minPrice, maxPrice };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
