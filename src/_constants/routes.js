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
const CAT_OTHERS = '/others';
const CAT_CONSUMABLES = '/consumables';
const CAT_COFFEE_BEANS = '/coffee-beans';

// const CAT_FASHION = '/fashion';
// const CAT_FURNITURE = '/furniture';
// const CAT_BOOKS = '/books';
// const CAT_AUTO = '/automotive';
// const CAT_SPORTS = '/sports';
// const CAT_GAMES = '/games';
// const CAT_HEALTH = '/health';

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
    CAT_OTHERS,
    CAT_CONSUMABLES,
    CAT_COFFEE_BEANS,
    UN_AUTHORIZED,
    UN_AUTHENTICATED,
    NOT_FOUND,
};
