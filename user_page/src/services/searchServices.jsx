import { request } from '~/utils';

const searchServices = {
    getProducts: async (query) => {
        try {
            const response = await request.get('products/search', {
                params: { query },
            });

            return response.data;
        } catch (error) {
            return { error, isSuccess: false };
        }
    },
};

export default searchServices;
