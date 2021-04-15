import { SET_USER, SET_USER_DETAIL, REMOVE_USER } from '../actionTypes';

const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    is_product_manager: false,
    is_sales_manager: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            const { pk, username, first_name, last_name, email } = action.payload;
            return {
                ...state,
                pk,
                username,
                first_name,
                last_name,
                email,
            };
        }
        case SET_USER_DETAIL: {
            const { is_product_manager, is_sales_manager, phone_number } = action.payload;
            return {
                ...state,
                is_product_manager,
                is_sales_manager,
                phone_number,
            };
        }
        case REMOVE_USER: {
            return null;
        }
        default:
            return state;
    }
};

export default user;
