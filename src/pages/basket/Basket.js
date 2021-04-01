import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SessionContext } from '../../components/sessions/sessions.ts';
import { SIGN_IN, SIGN_OUT } from '../../_constants';

const Basket = () => {
    const history = useHistory();
    const session = useContext(SessionContext);

    const handleSignOut = () => {
        history.push({
            pathname: SIGN_OUT,
        });
    };

    if (session.email === undefined) {
        history.push({ pathname: SIGN_IN });
    }

    return (
        <div>
            <h6>Protected data for {session.email}</h6>
            <button
                className="btn btn-secondary mr-2"
                type="submit"
                onClick={() => handleSignOut()}
            >
                Sign out
            </button>
        </div>
    );
};

export default Basket;
