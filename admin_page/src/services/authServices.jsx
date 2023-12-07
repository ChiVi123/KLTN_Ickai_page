import { request } from '~/utils';

const authServices = {
    async login(data) {
        try {
            const response = await request.post('auth/login', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default authServices;
