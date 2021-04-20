const LANDING = '/';

const SIGN_IN = '/sign-in';
const SIGN_UP = '/sign-up';
const SIGN_OUT = '/sign-out';
const PASSWORD_FORGET = '/password-forget';

const UN_AUTHORIZED = '/un-authorized';
const UN_AUTHENTICATED = '/un-authenticated';
const NOT_FOUND = '/not-found';

const BASKET = '/basket';
const PROFILE = '/account';
const ORDERS = '/orders';
const SETTINGS = '/settings';

// Product manager routes
const P_M_ITEMS = '/product-manager-items';
const P_M_ITEM_DETAILS = `${P_M_ITEMS}/details`; // product-manager-items/details?id=123456
const P_M_NEW_ITEM = `${P_M_ITEMS}/new`;
const P_M_EDIT_ITEM = `${P_M_ITEMS}/edit`;

// Categories
const CAT_ELECTRONICS = '/electronics';
const CAT_CONSUMABLES = '/consumables';
const CAT_FASHION = '/fashion';
const CAT_LIFE = '/life-style';
const CAT_HOBBY = '/hobby';
const CAT_TOYS = '/toys';
const CAT_COSMETICS = '/cosmetics';
const CAT_OTHERS = '/others';

// const S_M_CAMPAIGN = 'sales-manager-campaigns';

export {
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
    P_M_NEW_ITEM,
    P_M_EDIT_ITEM,
    CAT_ELECTRONICS,
    CAT_CONSUMABLES,
    CAT_FASHION,
    CAT_LIFE,
    CAT_HOBBY,
    CAT_TOYS,
    CAT_COSMETICS,
    CAT_OTHERS,
    UN_AUTHORIZED,
    UN_AUTHENTICATED,
    NOT_FOUND,
};
