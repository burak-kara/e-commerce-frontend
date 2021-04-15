import { SET_TOKEN, REMOVE_TOKEN } from '../actionTypes';

const initialState = {
    token: '',
};

const session = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN: {
            const { token } = action.payload;
            return {
                ...state,
                token,
            };
        }
        case REMOVE_TOKEN: {
            return null;
        }
        default:
            return state;
    }
};

export default session;
