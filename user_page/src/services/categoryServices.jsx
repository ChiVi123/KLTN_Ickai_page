import { request } from '~/utils';

const categoryServices = {
    getCategories: async () => {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch ({ response: { data } }) {
            throw data;
        }
    },
};

export default categoryServices;
