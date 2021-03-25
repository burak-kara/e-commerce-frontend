import React from 'react';
import { useHistory } from 'react-router-dom';
import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../../_constants';

const Home = () => {
    const history = useHistory();

    // TODO delete test purposes
    const handleSignIn = () => {
        history.push({
            pathname: SIGN_IN,
        });
    };

    const handleSignOut = () => {
        history.push({
            pathname: SIGN_OUT,
        });
    };

    const handleSignUp = () => {
        history.push({
            pathname: SIGN_UP,
        });
    };

    return (
        <div>
            <button className="btn btn-success mr-2" type="submit" onClick={() => handleSignIn()}>
                Sign in
            </button>
            <button
                className="btn btn-secondary mr-2"
                type="submit"
                onClick={() => handleSignOut()}
            >
                Sign out
            </button>
            <button className="btn btn-primary" type="submit" onClick={() => handleSignUp()}>
                Sign up
            </button>
        </div>
    );
};

export default Home;
