// import logger from '~/utils/logger';
import { request } from '~/utils';

const categoryServices = {
    getCategories: async () => {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch ({ response: { data } }) {
            throw data;
        }
    },
    getCategoryById: async (id) => {
        try {
            const response = await request.get(`categories/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    addCategory: async (data) => {
        try {
            const response = await request.post(
                'admin/manage/categories',
                data,
            );
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
    updateCategory: async (id, data) => {
        try {
            const response = await request.put(
                `admin/manage/categories/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default categoryServices;
