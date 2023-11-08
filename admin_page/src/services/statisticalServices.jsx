import { request } from '~/utils';

const prefix = 'admin/manage/stats';
const statisticalServices = {
    getCountByState: async () => {
        try {
            const response = await request.get(`${prefix}/state`);
            return response;
        } catch (error) {
            throw error?.response?.data?.message;
        }
    },
    getStats: async ({ from, to, type = 'month' }) => {
        try {
            const response = await request.get(`${prefix}/orders`, {
                params: { from, to, type },
            });
            return response;
        } catch (error) {
            throw error?.response?.data?.message;
        }
    },
};

export default statisticalServices;
