import axios from 'axios';
import { keys } from '~/common';

const domain =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_PRODUCTION
        : process.env.REACT_APP_API;
const key = `persist:${keys.persist}`;
const baseURL = `${domain}/api/`;

console.log(domain);

const getToken = () => {
    const item = window.localStorage.getItem(key);

    if (item) {
        const { user } = JSON.parse(item);
        const { accessToken } = JSON.parse(user);

        if (accessToken) {
            return accessToken;
        } else {
            return null;
        }
    }
};

const requestApi = axios.create({ baseURL });

requestApi.interceptors.request.use(function (request) {
    const { headers, method, url } = request;
    const token = getToken({ headers, method, url });

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

export const get = async (path, options = {}) => {
    const response = await requestApi.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, configs = {}) => {
    const response = await requestApi.post(path, options, configs);
    return response.data;
};

export const put = async (path, options = {}, configs = {}) => {
    const response = await requestApi.put(path, options, configs);
    return response.data;
};

export const requestDelete = async (path, options = {}, configs = {}) => {
    const response = await requestApi.delete(path, options, configs);
    return response.data;
};
