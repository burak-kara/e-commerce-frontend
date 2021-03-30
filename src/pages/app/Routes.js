import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import {
    Basket,
    Dummy,
    Home,
    Items,
    Orders,
    Profile,
    Settings,
    Signin,
    Signout,
    Signup,
} from '../index';
import {
    BASKET,
    LANDING,
    ORDERS,
    P_M_ITEMS,
    PROFILE,
    SETTINGS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
} from '../../_constants';

const Routes = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {}, [location]);

    const isSignPage = () => {
        const { pathname } = history.location;
        return pathname === SIGN_UP || pathname === SIGN_UP || pathname === SIGN_UP;
    };

    const renderHeader = () =>
        isSignPage() ? null : (
            <>
                <div className="sticky-top">
                    <Header />
                </div>
                <Navigation />
            </>
        );

    return (
        <>
            {renderHeader()}

            <Switch>
                <Route exact path="/test" component={Dummy} />

                <Route exact path={LANDING} component={Home} />

                <Route exact path={BASKET} component={Basket} />

                <Route exact path={PROFILE} component={Profile} />
                <Route exact path={SETTINGS} component={Settings} />
                <Route exact path={ORDERS} component={Orders} />

                <Route exact path={SIGN_UP} component={Signup} />
                <Route exact path={SIGN_OUT} component={Signout} />
                <Route exact path={SIGN_IN} component={Signin} />

                <Route exact path={P_M_ITEMS} component={Items} />
                {/* <Route path="*" component={ProtectedHandler} /> */}
            </Switch>
        </>
    );
};

export default Routes;
