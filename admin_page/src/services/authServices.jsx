import { request } from '~/utils';

const authServices = {
    login: async (data) => {
        try {
            const response = await request.post('auth/login', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default authServices;
