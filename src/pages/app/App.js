import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, 
         Route, Switch, useHistory, useLocation, Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { Header, Navigation } from '../../components';
import { Basket, Dummy, Home, Orders, Profile, Settings, Signup } from '../index';
import { LANDING, BASKET, PROFILE, SETTINGS, ORDERS, SIGN_UP, SIGN_IN } from '../../_constants';
import { SessionContext, 
         getSessionCookie,
         setSessionCookie } from '../../components/sessions/sessions.ts';

const LoginHandler = ({ history }) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        // Request to api login here instead of this fake request
        await new Promise(r => setTimeout(r(), 1000));
        setSessionCookie({ email });
        history.push("/");
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
                    
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

const LogoutHandler = ({ history }) => {
    useEffect(
        () => {
            Cookies.remove("session");
            history.push("/login");
        }, 
        [history]
    );

    return <div>Logging out!</div>;
};

const ProtectedHandler = ({ history }) => {
    const session = useContext(SessionContext);
    if (session.email === undefined) {
        history.push("/login");
    }
    return (
        <div>
            <h6>Protected data for {session.email}</h6>
            <Link to="/logout">Logout here</Link>
        </div>
    );
};

const App = () => {
    const [session, setSession] = useState(getSessionCookie());
    const history = useHistory();
    const location = useLocation();
    useEffect(
        () => {
        setSession(getSessionCookie());
        },
        [session]
    );
    useEffect(() => {}, [location]);

    return (
        <SessionContext.Provider value={session}>
            <Router>
                <>
                    {history.location.pathname !== SIGN_UP ? (
                        <>
                            <div className="sticky-top">
                                <Header />
                            </div>
                            <Navigation />
                        </>
                    ) : null}

                    <Switch>
                        <Route exact path="/test" component={Dummy} />

                        <Route exact path={LANDING} component={Home} />

                        <Route exact path={BASKET} component={Basket} />

                        <Route exact path={PROFILE} component={Profile} />
                        <Route exact path={SETTINGS} component={Settings} />
                        <Route exact path={ORDERS} component={Orders} />

                        <Route exact path={SIGN_UP} component={Signup} />
                        <Route exact path={SIGN_IN} component={Signup} />

                        <Route path="/login" component={LoginHandler} />
                        <Route path="/logout" component={LogoutHandler} />
                        <Route path="*" component={ProtectedHandler} />
                    </Switch>
                </>
            </Router>
        </SessionContext.Provider>
    );
};

export default App;
