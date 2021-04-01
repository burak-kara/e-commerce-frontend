import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SIGN_IN } from '../../_constants';

const Signout = () => {
    const history = useHistory();

    useEffect(() => {
        Cookies.remove('session');
        setTimeout(() => {
            history.push({
                pathname: SIGN_IN,
            });
        }, 5000);
    }, []);

    return <div>Logging out!</div>;
};

export default Signout;
