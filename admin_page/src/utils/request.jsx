import axios from 'axios';
import { keys } from '~/common';

const key = `persist:${keys.persist}`;
const baseURL = `${process.env.REACT_APP_API}/api/`;

// const getToken = (request) => {
const getToken = () => {
    const localStorage = window.localStorage.getItem(key);

    if (localStorage) {
        const { users } = JSON.parse(localStorage);
        const { item } = JSON.parse(users);

        if (item?.accessToken) {
            return item?.accessToken;
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
