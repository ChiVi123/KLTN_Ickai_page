import { request } from '~/utils';

const prefix = 'admin/manage/orders';
const orderServices = {
    async countState() {
        try {
            const response = await request.get('admin/orders/count');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getOrderById(id) {
        try {
            const response = await request.get(`${prefix}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async cancelById(id) {
        try {
            const response = await request.put(`${prefix}/setcancel/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deliveryById(id) {
        try {
            const response = await request.put(`${prefix}/setdelivery/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async completeById(id) {
        try {
            const response = await request.put(`${prefix}/setcomplete/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default orderServices;
