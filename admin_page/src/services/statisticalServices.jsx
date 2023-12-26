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
    async getQuantitySoldByCategory() {
        try {
            const response = await request.get('admin/products/quantitysold');
            return response.data;
        } catch (error) {
            throw error?.response?.data?.message;
        }
    },
};

export default statisticalServices;
