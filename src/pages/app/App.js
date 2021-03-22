import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import { Basket, Dummy, Home, Orders, Profile, Settings, Signup } from '../index';
import { LANDING, BASKET, PROFILE, SETTINGS, ORDERS, SIGN_UP, SIGN_IN } from '../../_constants';

const App = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {}, [location]);

    return (
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
            </Switch>
        </>
    );
};

export default App;
