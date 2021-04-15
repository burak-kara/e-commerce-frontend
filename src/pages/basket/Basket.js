import React from 'react';
import { useHistory } from 'react-router-dom';
import { SIGN_OUT } from '../../_constants';

const Basket = () => {
    const history = useHistory();

    const handleSignOut = () => {
        history.push({
            pathname: SIGN_OUT,
        });
    };

    return (
        <div>
            <h6>Protected data for</h6>
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
