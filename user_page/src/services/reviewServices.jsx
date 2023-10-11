import { request } from '~/utils';

const reviewServices = {
    getReviewByProductId: async (id) => {
        try {
            const response = await request.get(`comment/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addReview: async (data) => {
        try {
            const response = await request.post('comment', data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    editReview: async ({ id, data }) => {
        try {
            const response = await request.put(`comment/edit/${id}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteReviewByUser: async ({ id }) => {
        try {
            const response = await request.requestDelete(
                `comment/deletebyuser/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default reviewServices;
