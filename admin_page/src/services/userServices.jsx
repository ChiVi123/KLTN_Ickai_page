import { request } from '~/utils';

const prefix = 'admin/manage/users';
const userServices = {
    async getUsers(params = { page: 1, size: 5 }) {
        try {
            const response = await request.get(prefix, { params });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getUserById(id) {
        try {
            const response = await request.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async countState() {
        try {
            const response = await request.get('admin/users/count');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async blockUserById(id) {
        try {
            const response = await request.requestDelete(`${prefix}/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async unblockUserById(id) {
        try {
            const response = await request.put(`${prefix}/unblockuser/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default userServices;
