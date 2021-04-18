import {
    CLOSE_ALERT,
    SET_ALERT,
    SET_USER,
    REMOVE_USER,
    SET_TOKEN,
    REMOVE_TOKEN,
    SET_USER_DETAIL,
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    REMOVE_FROM_BASKET,
    REMOVE_BASKET,
    CALC_TOTAL,
} from './actionTypes';

export const openAlert = (payload) => ({
    type: SET_ALERT,
    payload,
});

export const closeAlert = () => ({
    type: CLOSE_ALERT,
});

export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});

export const setUserDetail = (payload) => ({
    type: SET_USER_DETAIL,
    payload,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

export const setToken = (payload) => ({
    type: SET_TOKEN,
    payload,
});

export const removeToken = () => ({
    type: REMOVE_TOKEN,
});

export const addToBasket = (id) => ({
    type: ADD_TO_BASKET,
    id,
});

export const deleteFromBasket = (id) => ({
    type: DELETE_FROM_BASKET,
    id,
});

export const removeFromBasket = (id) => ({
    type: REMOVE_FROM_BASKET,
    id,
});

export const removeBasket = () => ({
    type: REMOVE_BASKET,
});

export const calculateTotal = (basketItems) => ({
    type: CALC_TOTAL,
    basketItems,
});
