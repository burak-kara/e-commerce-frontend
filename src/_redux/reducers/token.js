import { SET_TOKEN, REMOVE_TOKEN } from '../actionTypes';

const initialState = {
    key: '',
};

const token = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN: {
            const { key } = action.payload;
            return {
                ...state,
                key,
            };
        }
        case REMOVE_TOKEN: {
            return null;
        }
        default:
            return state;
    }
};

export default token;
