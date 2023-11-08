import { request } from '~/utils';

const prefix = 'admin/manage/users';
const userServices = {
    blockUserById: async (id) => {
        try {
            const response = await request.requestDelete(`${prefix}/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    unblockUserById: async (id) => {
        try {
            const response = await request.put(`${prefix}/unblockuser/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getUsers: async (params = { page: 1, size: 5 }) => {
        try {
            const response = await request.get(prefix, { params });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserById: async (id) => {
        try {
            const response = await request.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default userServices;
