import { SET_USER, REMOVE_USER } from '../actionTypes';

const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
};

const session = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            const { username, first_name, last_name, email } = action.payload;
            return {
                ...state,
                username,
                first_name,
                last_name,
                email,
            };
        }
        case REMOVE_USER: {
            return null;
        }
        default:
            return state;
    }
};

export default session;
