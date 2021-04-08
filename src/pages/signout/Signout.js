import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LANDING, TOKEN } from '../../_constants';
import { logout } from '../../_requests';

const Signout = () => {
    const history = useHistory();

    useEffect(() => {
        logout()
            .then(() => {
                localStorage.removeItem(TOKEN);
                setTimeout(() => {
                    history.push({
                        pathname: LANDING,
                    });
                }, 500);
            })
            .catch(() => {
                // TODO handle error
            });
    }, []);

    // TODO proper sign up page
    return <div>Logging out!</div>;
};

export default Signout;
