import { request } from '~/utils';

const paymentServices = {
    postPayment: async ({ cartId, type, data }) => {
        try {
            const response = await request.post(
                `checkout/${type}/${cartId}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default paymentServices;
