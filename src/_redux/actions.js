import { CLOSE_ALERT, SET_ALERT } from './actionTypes';

export const openAlert = (payload) => ({
    type: SET_ALERT,
    payload,
});

export const closeAlert = () => ({
    type: CLOSE_ALERT,
});
