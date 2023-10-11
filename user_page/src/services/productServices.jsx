import { request } from '~/utils';

const productServices = {
    getProducts: async ({ page, size }) => {
        try {
            const response = await request.get('products', {
                params: { page, size },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductsByCategory: async ({ id, page, size }) => {
        // const selector = '> productServices > getProductsByCategory';

        try {
            const response = await request.get(`products/category/${id}`, {
                params: { page, size },
            });

            return response.data;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            // logger({
            //     groupName: `${pathName} ${selector}`,
            //     values: [message],
            // });

            throw message;
        }
    },
    getProductsByState: async ({ page, size }) => {
        try {
            const response = await request.get('products/byStateEnable', {
                params: { page, size },
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: async (id) => {
        try {
            const response = await request.get(`products/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    addProduct: async (data) => {
        try {
            const response = await request.post('products/add', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productServices;
