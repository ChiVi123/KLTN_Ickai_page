import { request } from '~/utils';

const prefix = 'admin/manage/categories';
const categoryServices = {
    async addCategory(data) {
        try {
            const response = await request.post(prefix, data);
            return response;
        } catch (exception) {
            throw exception?.response?.data?.message;
        }
    },
    async updateCategory(id, data) {
        try {
            const response = await request.put(`${prefix}/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getAllEnable() {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch (error) {
            console.log(error.response.data);
        }
    },
};

export default categoryServices;
