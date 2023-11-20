import { request } from '~/utils';

const productServices = {
    getProducts: async ({ page, size }) => {
        try {
            const response = await request.get('products/byStateEnable', {
                params: { page, size },
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getPopular: async ({ page, size }) => {
        try {
            const response = await request.get('products/soldDesc', {
                params: { page, size },
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getAllByCategory: async (id) => {
        try {
            const response = await request.get(`products/category/${id}`);

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getProduct: async (id) => {
        try {
            const response = await request.get(`products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default productServices;
