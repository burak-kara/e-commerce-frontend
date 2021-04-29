// All Routes
export const LANDING = '/';

export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';
export const SIGN_OUT = '/sign-out';
export const PASSWORD_FORGET = '/password-forget';

export const UN_AUTHORIZED = '/un-authorized';
export const UN_AUTHENTICATED = '/un-authenticated';
export const NOT_FOUND = '/not-found';

export const BASKET = '/basket';
export const PROFILE = '/account';
export const ORDERS = '/orders';
export const ORDER_DETAIL = '/order-detail';
export const SETTINGS = '/settings';
export const PRODUCT_DETAIL = '/product-details';

// Product manager routes
export const P_M_ITEMS = '/product-manager-products';
export const P_M_ITEM_DETAILS = `${P_M_ITEMS}/details`;
export const P_M_NEW_ITEM = `${P_M_ITEMS}/new`;
export const P_M_EDIT_ITEM = `${P_M_ITEMS}/edit`;
export const P_M_REVIEWS = '/reviews';

// Sales Manager Routes
export const S_M_ORDERS = '/all-orders';
export const S_M_ORDER_STATUS = '/order-status';
export const S_M_CAMPAIGNS = '/all-campaigns';

// Categories
export const CAT_ELECTRONICS = '/electronics';
export const CAT_CONSUMABLES = '/consumables';
export const CAT_FASHION = '/fashion';
export const CAT_LIFE = '/life-style';
export const CAT_HOBBY = '/hobby';
export const CAT_TOYS = '/toys';
export const CAT_COSMETICS = '/cosmetics';
export const CAT_OTHERS = '/others';

export const noneError = 'N';
export const STAR_COUNT = 5;
export const TOKEN = 'token';
export const TIME_OUT = 200;

// roles
export const COSTUMER = 'costumer';
export const PM = 'product_manager';
export const SM = 'sales_manager';

export const ORDER_STATUS = {
    0: 'Waiting for payment',
    1: 'Payment confirmed',
    2: 'Order is approved',
    3: 'Order is being prepared',
    4: 'Order is shipped',
    5: 'Order is delivered',
    6: 'Order is rejected',
};

// Regexes
export const emailRegex = new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}' +
        '\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
);
export const passwordRegex = /^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,8}$/;
