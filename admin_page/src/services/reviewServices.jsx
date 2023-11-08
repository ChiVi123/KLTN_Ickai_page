import { request } from '~/utils';

const prefix = 'admin/manage/comment';
const reviewServices = {
    getReviews: async ({ page, size }) => {
        try {
            const response = await request.get(`${prefix}/findall`, {
                params: { page, size },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    blockReview: async (id) => {
        try {
            const response = await request.requestDelete(
                `${prefix}/block/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    unblockReview: async (id) => {
        try {
            const response = await request.put(`${prefix}/setenable/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default reviewServices;
