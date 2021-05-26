import { SET_USER, SET_USER_DETAIL, REMOVE_USER } from '../actionTypes';

const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    addresses: '',
    is_product_manager: false,
    is_sales_manager: false,
    is_admin: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            const { pk, username, first_name, last_name, email, phone_number } = action.payload;
            return {
                ...state,
                pk,
                username,
                first_name,
                last_name,
                email,
                phone_number,
            };
        }
        case SET_USER_DETAIL: {
            const {
                is_product_manager,
                is_sales_manager,
                phone_number,
                addresses,
            } = action.payload;
            return {
                ...state,
                is_product_manager,
                is_sales_manager,
                phone_number,
                addresses,
            };
        }
        case REMOVE_USER: {
            return {
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                is_product_manager: false,
                is_sales_manager: false,
                is_admin: false,
            };
        }
        default:
            return state;
    }
};

export default user;
