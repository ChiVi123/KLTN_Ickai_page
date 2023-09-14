import { requestGoogle } from '~/utils';

const googleServices = {
    getProfile: async (access_token) => {
        try {
            const result = await requestGoogle.get({
                params: { access_token },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            return result;
        } catch (error) {
            console.log(error);
        }
    },
};

export default googleServices;
