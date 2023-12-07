import { request } from '~/utils';

const categoryServices = {
    getCategories: async () => {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default categoryServices;
