import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../_requests';
import { openAlert, removeToken, removeUser, removeBasket } from '../../_redux/actions';
import { LANDING, TIME_OUT, TOKEN } from '../../_constants';

const Signout = (params) => {
    useEffect(() => {
        logout()
            .then(() => {
                localStorage.removeItem(TOKEN);
                localStorage.clear();
                params.openAlert({
                    message: 'Logged out successfully',
                    severity: 'success',
                });
                params.removeToken();
                params.removeUser();
                params.removeBasket();
                setTimeout(() => {
                    // refreshes the page after signout
                    // to clear storage & state
                    window.location.href = LANDING;
                }, TIME_OUT);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Error during signing up',
                    severity: 'error',
                });
            });
    }, []);

    // TODO proper sign up page
    return <div>Logging out!</div>;
};

export default connect(null, { openAlert, removeToken, removeUser, removeBasket })(Signout);
