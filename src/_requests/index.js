import axios from 'axios';

// TODO change to the deployed backend server
const API_URL = 'http://127.0.0.1:8000/api/';
// const API_URL = 'http://85.105.153.191:8000/api/';

axios.defaults.headers.common.Accept = '*/*';

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

const register = (params) => {
    const { path, data } = params;
    return postRequest({
        path,
        data,
    });
};

const login = (params) => {
    const { path, data } = params;
    return postRequest({
        path,
        data,
    });
};

const getProductManagerItems = () =>
    getRequest({
        path: 'items',
    });

const postNewItem = (params) =>
    postRequest({
        path: 'items/',
        data: params,
    });

const deleteItem = (id) =>
    deleteRequest({
        path: `items/${id}/`,
    });

const getCategories = () =>
    getRequest({
        path: 'categories',
    });

export { register, login, getProductManagerItems, getCategories, postNewItem, deleteItem };
