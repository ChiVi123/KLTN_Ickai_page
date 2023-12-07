import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const getStatistical = createAsyncThunk(
    'statistical/getStatistical',
    async function getStatistical(
        { from, to, type = 'month' },
        { rejectWithValue },
    ) {
        try {
            const response = await request.get('admin/manage/stats/orders', {
                params: { from, to, type },
            });
            const expectMessage = 'Get orders sale successful';

            if (response?.message === expectMessage) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
