import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartServices } from '~/services';

export const getByToken = createAsyncThunk(
    'cart/getByToken',
    async (_, { rejectWithValue }) => {
        try {
            const result = await cartServices.getCartByToken();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
