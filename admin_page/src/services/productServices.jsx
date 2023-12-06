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
    getProduct: async (id) => {
        try {
            const response = await request.get(`products/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    countState: async () => {
        try {
            const response = await request.get('admin/products/count');
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
    editProduct: async ({ id, data }) => {
        try {
            const response = await request.put(`products/update/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await request.requestDelete(
                `products/delete/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    restoreProduct: async (id) => {
        try {
            const response = await request.put(`products/setstateenable/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    addImagesProduct: async ({ id, data }) => {
        try {
            const response = await request.post(
                `products/uploadimage/${id}`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteImageProduct: async ({ id, idImage }) => {
        try {
            const response = await request.requestDelete(
                `products/deleteimage/${id}/${idImage}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productServices;
