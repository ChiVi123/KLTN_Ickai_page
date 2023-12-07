import { request } from '~/utils';

const reviewServices = {
    getByProductId: async (id) => {
        try {
            const response = await request.get(`comment/${id}`);

            if (response.isSuccess) {
                return response.data;
            }

            return {
                list: [],
                totalPage: 0,
            };
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
    deleteByUser: async (id) => {
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
