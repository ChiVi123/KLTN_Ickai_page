import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewServices } from '~/services';

export const getAllReview = createAsyncThunk(
    'reviews/getAllReview',
    async ({ sortBy, state, page, size }, { rejectWithValue }) => {
        try {
            const result = await reviewServices.getReviews({
                sortBy,
                state,
                page,
                size,
            });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
