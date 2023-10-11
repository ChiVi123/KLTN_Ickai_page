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
    uploadAvatar: async (id, data) => {
        try {
            const response = await request.post(`users/avatar/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    resetPassword: async (id, data) => {
        try {
            const response = await request.put(
                `users/resetpassword/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: async (id, data) => {
        try {
            const response = await request.put(`users/password/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default userServices;
