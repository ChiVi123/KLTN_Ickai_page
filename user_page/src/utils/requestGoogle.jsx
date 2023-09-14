import axios from 'axios';

const requestGG = axios.create({
    baseURL: 'https://www.googleapis.com/oauth2/v1/',
    headers: {
        Accept: 'application/json',
    },
});

export const get = async (options = {}) => {
    const response = await requestGG.get('userinfo', options);
    return response.data;
};
