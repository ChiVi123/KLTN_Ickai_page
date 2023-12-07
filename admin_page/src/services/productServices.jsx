import { request } from '~/utils';

const productServices = {
    async addProduct(data) {
        try {
            const response = await request.post('products/add', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async editProduct({ id, data }) {
        try {
            const response = await request.put(`products/update/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteProduct(id) {
        try {
            const response = await request.requestDelete(
                `products/delete/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async restoreProduct(id) {
        try {
            const response = await request.put(`products/setstateenable/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async addImagesProduct({ id, data }) {
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
    async deleteImageProduct({ id, idImage }) {
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
