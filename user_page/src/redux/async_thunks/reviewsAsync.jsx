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

export const getReviewsByAdmin = createAsyncThunk(
    'reviews/getReviewsByAdmin',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const result = await reviewServices.adminGetReviews({ page, size });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
