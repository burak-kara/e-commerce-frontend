import React from 'react';
import { useHistory } from 'react-router-dom';
import { SIGN_UP } from '../../_constants';

const Home = () => {
    const history = useHistory();

    const handleSignUp = () => {
        history.push({
            pathname: SIGN_UP,
        });
    };

    return (
        <div>
            <button className="btn btn-success" type="submit" onClick={() => handleSignUp()}>
                Sign up
            </button>
        </div>
    );
};

export default Home;
