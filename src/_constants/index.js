import {
    LANDING,
    BASKET,
    PROFILE,
    SETTINGS,
    ORDERS,
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    P_M_ITEMS,
    P_M_ITEM_DETAILS,
} from './routes';

export {
    LANDING,
    BASKET,
    PROFILE,
    SETTINGS,
    ORDERS,
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    P_M_ITEMS,
    P_M_ITEM_DETAILS,
};

export const noneError = 'N';
export const STAR_COUNT = 5;

// roles
export const COSTUMER = 'costumer';
export const PM = 'product_manager';
export const SM = 'sales_manager';

// Regexes
export const emailRegex = new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}' +
        '\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
);
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
