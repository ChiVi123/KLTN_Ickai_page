import { request } from '~/utils';

const orderServices = {
    userGetAllOrder: async () => {
        try {
            const response = await request.get(`orders/getallorder`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userGetOrderById: async (id) => {
        try {
            const response = await request.get(`orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userGetOrdersComplete: async () => {
        try {
            const response = await request.get(`orders/getallordercomplete`);
            return response.data;
        } catch (error) {
            return { list: [] };
        }
    },
    userCancelOrderById: async ({ id }) => {
        try {
            const response = await request.put(`orders/cancel/${id}`);
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
};

export default orderServices;
