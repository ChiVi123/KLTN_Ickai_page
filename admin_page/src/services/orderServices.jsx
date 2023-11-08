import { request } from '~/utils';

const prefix = 'admin/manage/orders';
const orderServices = {
    getAllOrder: async (page) => {
        try {
            const response = await request.get('admin/manage/ordersEnable', {
                params: { page, size: 10 },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getOrderById: async (id) => {
        try {
            const response = await request.get(`${prefix}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    cancelById: async (id) => {
        try {
            const response = await request.put(`${prefix}/setcancel/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    deliveryById: async (id) => {
        try {
            const response = await request.put(`${prefix}/setdelivery/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    completeById: async (id) => {
        try {
            const response = await request.put(`${prefix}/setcomplete/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default orderServices;
