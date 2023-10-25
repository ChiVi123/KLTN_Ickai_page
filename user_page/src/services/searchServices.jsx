import { request } from '~/utils';
import { logger } from '~/utils/logger';

const isLogger = false;
const searchServices = {
    getProducts: async (query) => {
        try {
            const response = await request.get('products/search', {
                params: { query },
            });

            return response.data;
        } catch (error) {
            if (isLogger) {
                logger({ groupName: 'search api', values: [error] });
            }

            return { error, isSuccess: false };
        }
    },
};

export default searchServices;
