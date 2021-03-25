import { LANDING, BASKET, PROFILE, SETTINGS, ORDERS, SIGN_UP, SIGN_IN, SIGN_OUT } from './routes';

export { LANDING, BASKET, PROFILE, SETTINGS, ORDERS, SIGN_UP, SIGN_IN, SIGN_OUT };

export const noneError = 'N';
export const emailRegex = new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}' +
        '\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
);
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
