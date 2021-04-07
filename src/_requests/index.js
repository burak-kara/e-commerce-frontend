import axios from 'axios';

// TODO change to the deployed backend server
// const API_URL = 'http://127.0.0.1:8000/';
const API_URL = 'https://burak-kara.dev/';

const API = 'api/';
const AUTH = 'rest-auth/';

axios.defaults.headers.common.Accept = '*/*';

// Common Request Makers
const getRequest = (params) => {
    const { path } = params;
    const url = API_URL + path;
    return axios.get(url);
};

const postRequest = (params) => {
    const { path, data } = params;
    const url = API_URL + path;
    return axios.post(url, data);
};

const deleteRequest = (params) => {
    const { path } = params;
    const url = API_URL + path;
    return axios.delete(url);
};

// Session Requests
const register = (data) =>
    postRequest({
        path: `${AUTH}registration/`,
        data,
    });

const login = (data) =>
    postRequest({
        path: `${AUTH}login/`,
        data,
    });

const getProductManagerItems = () =>
    getRequest({
        path: `${API}items/`,
    });

const postNewItem = (data) =>
    postRequest({
        path: `${API}items/`,
        data,
    });

const deleteItem = (id) =>
    deleteRequest({
        path: `${API}items/${id}/`,
    });

const getCategories = () =>
    getRequest({
        path: `${API}categories/`,
    });

export { register, login, getProductManagerItems, getCategories, postNewItem, deleteItem };
