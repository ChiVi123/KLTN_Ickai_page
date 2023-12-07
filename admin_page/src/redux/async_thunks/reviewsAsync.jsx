import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '~/utils';

export const search = createAsyncThunk(
    'reviews/searchReview',
    async function searchReview(
        { sortBy, state, page, size },
        { rejectWithValue },
    ) {
        try {
            const response = await request.get('admin/manage/comment/findall', {
                params: { sortBy, state, page, size },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const count = createAsyncThunk(
    'reviews/count',
    async function countReviewState(_, { rejectWithValue }) {
        try {
            const response = await request.get('admin/comment/count');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
