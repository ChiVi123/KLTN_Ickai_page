import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewServices } from '~/services';

export const getReviewByProductId = createAsyncThunk(
    'reviews/getReviewByProductId',
    async (id, { rejectWithValue }) => {
        try {
            const result = await reviewServices.getReviewByProductId(id);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
