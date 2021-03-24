import React from 'react';
import { useHistory } from 'react-router-dom';
import { SIGN_UP } from '../../_constants';
import { register } from '../../_services';

const Home = () => {
    const history = useHistory();

    // TODO delete test purposes
    const handleSignUp = () => {
        register({
            path: 'rest-auth/registration/',
            data: {
                email: 'burak.kara2@ozu.edu.tr',
                username: 'burakkara',
                password1: 'burakkara',
                password2: 'burakkara',
            },
        })
            .then((response) => response)
            .catch(() => {});
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
