import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderServices } from '~/services';
import { request } from '~/utils';

export const getAllOrderEnable = createAsyncThunk(
    'orders/getAllOrderEnable',
    async (page, { rejectWithValue }) => {
        try {
            const result = await orderServices.getAllOrder(page);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const search = createAsyncThunk(
    'orders/search',
    async (
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
    ) => {
        try {
            const response = await request.get('admin/orders', {
                params: { q: query, sortBy, from, to, state, page, size },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
