import { request } from '~/utils';

const prefix = 'admin/manage/comment';
const reviewServices = {
    getReviews: async ({ sortBy = '', state = '', page, size }) => {
        try {
            const response = await request.get(`${prefix}/findall`, {
                params: { sortBy, state, page, size },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    countState: async () => {
        try {
            const response = await request.get('admin/comment/count');
            return response.data;
        } catch (error) {
            console.log(error);
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
};

export default reviewServices;
