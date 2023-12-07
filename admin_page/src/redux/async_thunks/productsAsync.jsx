import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const getById = createAsyncThunk(
    'products/getById',
    async function getProduct(id, { rejectWithValue }) {
        try {
            const response = await request.get(`products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
export const search = createAsyncThunk(
    'products/search',
    async function searchProduct(
        { query, sortBy = '', minPrice, maxPrice, state, page, size },
        { rejectWithValue },
    ) {
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
export const count = createAsyncThunk(
    'products/count',
    async function countProductState(_, { rejectWithValue }) {
        try {
            const response = await request.get('admin/products/count');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
