import { SET_ALERT, CLOSE_ALERT } from '../actionTypes';

const initialState = {
    open: false,
    message: '',
    severity: '',
    duration: 3000,
};

const alert = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT: {
            const { message, severity } = action.payload;
            return {
                ...state,
                open: true,
                message,
                severity,
            };
        }
        case CLOSE_ALERT: {
            return {
                ...state,
                open: false,
            };
        }
        default:
            return state;
    }
};

export default alert;
