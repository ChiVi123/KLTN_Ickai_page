import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryServices } from '~/services';
import { logger } from '~/utils/logger';

const isLogger = false;

if (isLogger) {
    logger({ groupName: 'categories', values: ['result'] });
}

export const getAllEnable = createAsyncThunk(
    'categories/getAllEnable',
    async (_, { rejectWithValue }) => {
        try {
            const result = await categoryServices.getCategories();
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const getAllState = createAsyncThunk(
    'categories/getAllState',
    async (_, { rejectWithValue }) => {
        try {
            const result = await categoryServices.getCategoriesRoleAdmin();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
