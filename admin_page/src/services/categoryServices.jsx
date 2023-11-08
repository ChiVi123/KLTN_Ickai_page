import { request } from '~/utils';

const prefix = 'admin/manage/categories';
const categoryServices = {
    getCategories: async () => {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch ({ response: { data } }) {
            throw data;
        }
    },
    getCategoriesRoleAdmin: async () => {
        try {
            const response = await request.get(prefix);
            return response.data;
        } catch ({ response: data }) {
            return data;
        }
    },
    addCategory: async (data) => {
        try {
            const response = await request.post(prefix, data);
            return response;
        } catch (exception) {
            throw exception?.response?.data?.message;
        }
    },
    updateCategory: async (id, data) => {
        try {
            const response = await request.put(`${prefix}/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default categoryServices;
