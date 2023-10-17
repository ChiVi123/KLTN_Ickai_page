import { request } from '~/utils';

const searchServices = {
    searchProducts: async ({ q, page, size }) => {
        try {
            const response = await request.get('products/search', {
                params: { q, page, size },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getProducts: async ({ query = '', sortBy = '', order = '' }) => {
        try {
            const response = await request.get('products/search', {
                params: { query, sortBy, order },
            });

            return response.data;
        } catch (error) {
            return { error, isSuccess: false };
        }
    },
};

export default searchServices;
