import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const search = createAsyncThunk(
    'orderHistory/search',
    async function searchOrder(
        {
            query = '',
            sortBy = '',
            from = '01-01-2022',
            to = '30-12-2023',
            state = '',
            page = 0,
            size = 10,
        },
        { rejectWithValue },
    ) {
        try {
            const response = await request.get('admin/orders', {
                params: { q: query, sortBy, from, to, state },
            });
            return { list: response.data, page, size };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const count = createAsyncThunk(
    'orderHistory/count',
    async function countOrderState(_, { rejectWithValue }) {
        try {
            const response = await request.get('admin/orders/count');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
