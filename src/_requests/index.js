import axios from 'axios';

const { REACT_APP_API_URL_LOCAL, REACT_APP_API_URL_DEPLOYED, NODE_ENV } = process.env;

// TODO change to the deployed backend server
const API_URL = NODE_ENV === 'production' ? REACT_APP_API_URL_DEPLOYED : REACT_APP_API_URL_LOCAL;

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

const getItems = () =>
    getRequest({
        path: `${API}items/`,
    });

const getItemsByCategory = (category) => {
    const cat = category.replaceAll('-', ' ');
    return getRequest({
        path: `${API}items/${cat}/`,
    });
};

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

export { register, login, getItems, getCategories, postNewItem, deleteItem, getItemsByCategory };
