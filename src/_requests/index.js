import axios from 'axios';
import { TOKEN } from '../_constants';

const { REACT_APP_API_URL_LOCAL, REACT_APP_API_URL_DEPLOYED, NODE_ENV } = process.env;

const API_URL = NODE_ENV === 'production' ? REACT_APP_API_URL_DEPLOYED : REACT_APP_API_URL_LOCAL;

const token = localStorage.getItem(TOKEN);

const API = 'api/';
const AUTH = 'rest-auth/';
const TOTP = 'totp/';

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

const getAllUsers = () =>
    getRequest({
        path: `${API}getAllUsers/`,
    });

const getUserDetail = () =>
    getRequest({
        path: `${API}user/`,
    });

const updateCurrentUser = (data) =>
    putRequest({
        path: `${API}user/`,
        data,
    });

const updateUserByID = (data, id) =>
    putRequest({
        path: `${API}admin-user-update/${id}/`,
        data,
    });

const changePassword = (data) =>
    postRequest({
        path: `${AUTH}password/change/`,
        data,
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
    const cat = category.replace(/-/g, '');
    return getRequest({
        path: `${API}items/${cat}/`,
    });
};

const getItemsBySearch = (search) =>
    getRequest({
        path: `${API}items/search?search=${search}`,
    });

const getItemsByCategoryBrandSortSearch = (data) => {
    const { category, brand, ordering, search, rating_gt, price_gt, price_lt } = data;
    const cat = category.replace(/-/g, '');
    let path = `${API}items/search?`;
    path += cat ? `category=${cat}&` : '';
    path += search ? `search=${search}&` : '';
    path += brand ? `brand=${brand}&` : '';
    path += ordering ? `ordering=${ordering}&` : '';
    path += rating_gt ? `rating_gt=${rating_gt}&` : '';
    path += price_gt ? `price_gt=${price_gt}&` : '';
    path += price_lt ? `price_lt=${price_lt}&` : '';
    return getRequest({
        path,
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

const getTotalPrice = (data) =>
    postRequest({
        path: `${API}getPrice/`,
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

const updateOrder = (data) => {
    const { id } = data;
    return putRequest({
        path: `${API}orders/${id}/`,
        data,
    });
};

const getAllReviews = () =>
    getRequest({
        path: `${API}reviews/`,
    });

const getAllReviewsByItem = (id) =>
    getRequest({
        path: `${API}item/reviews/${id}`,
    });

const getReviewById = (id) =>
    getRequest({
        path: `${API}reviews/${id}`,
    });

const newReview = (data) =>
    postRequest({
        path: `${API}reviews/`,
        data,
    });

const updateReview = (data) => {
    const { id } = data;
    return putRequest({
        path: `${API}reviews/${id}/`,
        data,
    });
};

const deleteReview = (id) =>
    deleteRequest({
        path: `${API}reviews/${id}/`,
    });

const getAddressesByUserID = (id) =>
    getRequest({
        path: `${API}addresses/${id}/`,
    });

const getBrandsByCategory = (category) => {
    const cat = category.replace(/-/g, '');
    return getRequest({
        path: `${API}brands/${cat}/`,
    });
};

const getQRLink = () =>
    getRequest({
        path: `${TOTP}create/`,
    });

const verify2FA = (code) =>
    postRequest({
        path: `${TOTP}login/${code}/`,
    });

const retrieveRating = (data) =>
    postRequest({
        path: `${API}rating-from-comment/`,
        data,
    });

const getStats = () =>
    getRequest({
        path: `${API}stats/`,
    });

const getAd = () =>
    postRequest({
        path: `${API}recommended-adds/`,
    });

const getAllCampaigns = () =>
    getRequest({
        path: `${API}campaign/`,
    });

const createNewCampaign = (data) =>
    postRequest({
        path: `${API}campaign/`,
        data,
    });

const deleteCampaignByID = (id) =>
    deleteRequest({
        path: `${API}campaign/${id}/`,
    });

const getCurrentFunds = () =>
    getRequest({
        path: `${API}funding/`,
    });

const addFundsToUser = (data) =>
    postRequest({
        path: `${API}funding/`,
        data,
    });

const getRecommendedProducts = (count) =>
    postRequest({
        path: `${API}get-recomended-products/${count}/`,
    });

export {
    register,
    login,
    logout,
    getUser,
    getAllUsers,
    getUserDetail,
    updateCurrentUser,
    updateUserByID,
    changePassword,
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
    getAllReviews,
    getAllReviewsByItem,
    getReviewById,
    newReview,
    updateReview,
    deleteReview,
    getAddressesByUserID,
    getItemsBySearch,
    getBrandsByCategory,
    getItemsByCategoryBrandSortSearch,
    getQRLink,
    verify2FA,
    retrieveRating,
    getStats,
    getAd,
    getAllCampaigns,
    createNewCampaign,
    deleteCampaignByID,
    getCurrentFunds,
    addFundsToUser,
    getRecommendedProducts,
    getTotalPrice,
};
