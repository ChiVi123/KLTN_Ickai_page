import { request } from '~/utils';

const userServices = {
    getUser: async (id) => {
        try {
            const response = await request.get(`users/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async (id, data) => {
        try {
            const response = await request.put(`users/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    adminBlockUserById: async ({ id }) => {
        try {
            const response = await request.requestDelete(
                `admin/manage/users/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    adminUnblockUserById: async ({ id }) => {
        try {
            const response = await request.put(
                `admin/manage/users/unblockuser/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    adminSetRoleUserById: async ({ id, data }) => {
        try {
            const response = await request.put(
                `admin/manage/users/setrole/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getUsers: async (params = { page: 1, size: 5 }) => {
        try {
            const response = await request.get('admin/manage/users', {
                params,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserById: async ({ id }) => {
        try {
            const response = await request.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default userServices;
