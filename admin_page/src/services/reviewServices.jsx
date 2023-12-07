import { request } from '~/utils';

const prefix = 'admin/manage/comment';
const reviewServices = {
    async unblockReview(id) {
        try {
            const response = await request.put(`${prefix}/setenable/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async blockReview(id) {
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
