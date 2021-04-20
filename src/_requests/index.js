import axios from 'axios';
import { TOKEN } from '../_constants';

const { REACT_APP_API_URL_LOCAL, REACT_APP_API_URL_DEPLOYED, NODE_ENV } = process.env;

const API_URL = NODE_ENV === 'production' ? REACT_APP_API_URL_DEPLOYED : REACT_APP_API_URL_LOCAL;

const token = localStorage.getItem(TOKEN);

const API = 'api/';
const AUTH = 'rest-auth/';

axios.defaults.headers.common.Accept = '*/*';
if (token) {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
}

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

const putRequest = (params) => {
    const { path, data } = params;
    const url = API_URL + path;
    return axios.put(url, data);
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

const logout = () =>
    postRequest({
        path: `${AUTH}logout/`,
    });

const getUser = (tt) => {
    axios.defaults.headers.common.Authorization = `Token ${tt}`;
    return getRequest({
        path: `${AUTH}user/`,
    });
};

const getUserDetail = () =>
    getRequest({
        path: `${API}user/`,
    });

const getItems = () =>
    getRequest({
        path: `${API}items/`,
    });

const getItemById = (id) =>
    getRequest({
        path: `${API}items/${id}/`,
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

const editItem = (data) => {
    const { id } = data;
    return putRequest({
        path: `${API}items/${id}/`,
        data,
    });
};

const deleteItem = (id) =>
    deleteRequest({
        path: `${API}items/${id}/`,
    });

const getCategories = () =>
    getRequest({
        path: `${API}categories/`,
    });

const newOrder = (data) =>
    postRequest({
        path: `${API}orders/`,
        data,
    });

const getAllOrders = () =>
    getRequest({
        path: `${API}orders/`,
    });

const getOrderDetail = (id) =>
    getRequest({
        path: `${API}orders/${id}`,
    });

// TODO not used yet
const updateOrder = (data) => {
    const { id } = data;
    return putRequest({
        path: `${API}orders/${id}`,
        data,
    });
};

export {
    register,
    login,
    logout,
    getUser,
    getUserDetail,
    getItems,
    getItemById,
    getItemsByCategory,
    getCategories,
    postNewItem,
    editItem,
    deleteItem,
    newOrder,
    getAllOrders,
    getOrderDetail,
    updateOrder,
};
