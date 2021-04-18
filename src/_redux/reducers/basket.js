import {
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    REMOVE_FROM_BASKET,
    REMOVE_BASKET,
    CALC_TOTAL,
} from '../actionTypes';
import calculateTotalPrice from '../../_utilities/functions';

const initialState = {
    items: {},
    itemCount: 0,
    total: 0,
    firer: 0, // dummy data to fire up state update
};

const basket = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET: {
            const { id } = action;
            const { items } = state;
            if (id in items) {
                items[id] += 1;
                return {
                    ...state,
                    items,
                    firer: state.firer + 1,
                };
            }
            items[id] = 1;
            return {
                ...state,
                items,
                itemCount: state.itemCount + 1,
            };
        }
        case DELETE_FROM_BASKET: {
            const { id } = action;
            const { items } = state;
            if (items[id] - 1 > 0) {
                items[id] -= 1;
                return {
                    ...state,
                    items,
                    firer: state.firer + 1,
                };
            }
            delete items[id];
            return {
                ...state,
                items,
                itemCount: state.itemCount - 1,
            };
        }
        case REMOVE_FROM_BASKET: {
            const { id } = action;
            const { items } = state;
            delete items[id];
            return {
                ...state,
                items,
                itemCount: state.itemCount - 1,
            };
        }
        case REMOVE_BASKET: {
            return initialState;
        }
        case CALC_TOTAL: {
            const { basketItems } = action;
            const { items } = state;
            const tmpTotal = calculateTotalPrice(items, basketItems);
            return {
                ...state,
                total: tmpTotal,
            };
        }
        default:
            return state;
    }
};

export default basket;
