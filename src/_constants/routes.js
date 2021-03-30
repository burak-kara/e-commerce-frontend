const LANDING = '/';

const SIGN_IN = '/sign-in';
const SIGN_UP = '/sign-up';
const SIGN_OUT = '/sign-out';
const PASSWORD_FORGET = '/password-forget';

const BASKET = '/basket';

const PROFILE = '/account';
const ORDERS = '/orders';
const SETTINGS = '/settings';

const P_M_ITEMS = '/product-manager-items';
const P_M_ITEM_DETAILS = `${P_M_ITEMS}/details`; // product-manager-items/details?id=123456

// const S_M_CAMPAIGN = 'sales-manager-campaigns';

// TODO delete
const TEST = '/test';

export {
    TEST,
    LANDING,
    BASKET,
    PROFILE,
    SETTINGS,
    PASSWORD_FORGET,
    ORDERS,
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    P_M_ITEMS,
    P_M_ITEM_DETAILS,
};
