import { ADD_BASKET, DELETE_BASKET, REMOVE_BASKET } from '../actionTypes';

const initialState = {
    items: {},
};

const session = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BASKET: {
            const { id } = action;
            const { items } = state;
            if (id in items) {
                items[id] += 1;
            } else {
                items[id] = 1;
            }
            return {
                ...state,
                items,
            };
        }
        case DELETE_BASKET: {
            const { id } = action.payload;
            const { items } = state;
            if (items[id] - 1 >= 0) {
                items[id] -= 1;
            } else {
                delete items[id];
            }
            return {
                ...state,
                items,
            };
        }
        case REMOVE_BASKET: {
            const { id } = action.payload;
            const { items } = state;
            delete items[id];
            return {
                ...state,
                items,
            };
        }
        default:
            return state;
    }
};

export default session;
