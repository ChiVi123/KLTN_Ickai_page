import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const getAllEnable = createAsyncThunk(
    'categories/getAllEnable',
    async function getAllEnable(_, { rejectWithValue }) {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const getAllState = createAsyncThunk(
    'categories/getAllState',
    async function getAllState(_, { rejectWithValue }) {
        try {
            const response = await request.get('admin/manage/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
