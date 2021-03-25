import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setSessionCookie } from '../../components/sessions/sessions.ts';
import { LANDING } from '../../_constants';

const Signin = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSessionCookie({ email });
        history.push({
            pathname: LANDING,
        });
        setLoading(false);
    };

    if (loading) {
        return <h4>Logging in...</h4>;
    }

    return (
        <div className="login-handler">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Signin;
