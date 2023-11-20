import { request } from '~/utils';

const orderServices = {
    getAllOrder: async () => {
        try {
            const response = await request.get(`orders/getallorder`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getOrderById: async (id) => {
        try {
            const response = await request.get(`orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllStateComplete: async () => {
        try {
            const response = await request.get(`orders/getallordercomplete`);

            if (response.isSuccess) {
                return response.data;
            }

            return { list: [] };
        } catch (error) {
            return { list: [] };
        }
    },
    cancelById: async (id) => {
        try {
            const response = await request.put(`orders/cancel/${id}`);
            return response;
        } catch (error) {
            throw error?.response?.data?.message;
        }
    },
};

export default orderServices;
