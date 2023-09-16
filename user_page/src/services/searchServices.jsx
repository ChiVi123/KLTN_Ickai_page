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
};

export default searchServices;
