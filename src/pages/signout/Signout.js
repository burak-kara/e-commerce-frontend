import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../_requests';
import { openAlert, removeToken, removeUser } from '../../_redux/actions';
import { LANDING, TIME_OUT, TOKEN } from '../../_constants';

const Signout = (params) => {
    const history = useHistory();

    useEffect(() => {
        logout()
            .then(() => {
                localStorage.removeItem(TOKEN);
                params.openAlert({
                    message: 'Logged out successfully',
                    severity: 'success',
                });
                params.removeToken();
                params.removeUser();
                setTimeout(() => {
                    history.push({
                        pathname: LANDING,
                    });
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

export default connect(null, { openAlert, removeToken, removeUser })(Signout);
