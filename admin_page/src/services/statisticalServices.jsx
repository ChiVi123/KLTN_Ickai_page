import { request } from '~/utils';

const prefix = 'admin/manage/stats/';
const statisticalServices = {
    getCountByState: async () => {
        try {
            const response = await request.get(`${prefix}state`);
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
    getStats: async ({ from, to, type = 'month' }) => {
        try {
            const response = await request.get(`${prefix}orders`, {
                params: { from, to, type },
            });
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

export default statisticalServices;
