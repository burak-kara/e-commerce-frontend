import {
    CLOSE_ALERT,
    SET_ALERT,
    SET_USER,
    REMOVE_USER,
    SET_TOKEN,
    REMOVE_TOKEN,
    SET_USER_DETAIL,
    ADD_BASKET,
    DELETE_BASKET,
    REMOVE_BASKET,
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

export const addBasket = (id) => ({
    type: ADD_BASKET,
    id,
});

export const deleteBasket = (id) => ({
    type: DELETE_BASKET,
    id,
});

export const removeBasket = () => ({
    type: REMOVE_BASKET,
});
