import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import {
    Basket,
    Dummy,
    Home,
    Items,
    ItemSingleView,
    Orders,
    Profile,
    Settings,
    Signin,
    Signout,
    Signup,
    Products,
} from '../index';
import {
    BASKET,
    LANDING,
    ORDERS,
    P_M_ITEMS,
    P_M_NEW_ITEM,
    PROFILE,
    SETTINGS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    CAT_ELECTRONICS,
    CAT_OTHERS,
    CAT_CONSUMABLES,
    CAT_COFFEE_BEANS,
} from '../../_constants';

const Routes = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {}, [location]);

    const isSignPage = () => {
        const { pathname } = history.location;
        return pathname === SIGN_UP || pathname === SIGN_UP || pathname === SIGN_UP;
    };

    const isLoginPage = () => {
        const { pathname } = history.location;
        return pathname === SIGN_IN || pathname === SIGN_IN || pathname === SIGN_IN;
    };

    const renderHeader = () =>
        isSignPage() || isLoginPage() ? null : (
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
                <Route exact path="/test">
                    <Dummy />
                </Route>

                <Route exact path={LANDING}>
                    <Home />
                </Route>

                <Route exact path={BASKET}>
                    <Basket />
                </Route>

                <Route exact path={PROFILE}>
                    <Profile />
                </Route>
                <Route exact path={SETTINGS}>
                    <Settings />
                </Route>
                <Route exact path={ORDERS}>
                    <Orders />
                </Route>

                <Route exact path={SIGN_UP}>
                    <Signup />
                </Route>
                <Route exact path={SIGN_OUT}>
                    <Signout />
                </Route>
                <Route exact path={SIGN_IN}>
                    <Signin />
                </Route>

                <Route exact path={P_M_ITEMS}>
                    <Items />
                </Route>
                <Route exact path={P_M_NEW_ITEM}>
                    <ItemSingleView />
                </Route>

                <Route exact path={CAT_ELECTRONICS}>
                    <Products category={CAT_ELECTRONICS} />
                </Route>
                <Route exact path={CAT_OTHERS}>
                    <Products category={CAT_OTHERS} />
                </Route>
                <Route exact path={CAT_CONSUMABLES}>
                    <Products category={CAT_CONSUMABLES} />
                </Route>
                <Route exact path={CAT_COFFEE_BEANS}>
                    <Products category={CAT_COFFEE_BEANS} />
                </Route>
                {/* <Route exact path={CAT_FASHION}> */}
                {/*    <Products category={CAT_FASHION} /> */}
                {/* </Route> */}
                {/* <Route exact path={CAT_FURNITURE}> */}
                {/*    <Products category={CAT_FURNITURE} /> */}
                {/* </Route> */}
                {/* <Route exact path={CAT_BOOKS}> */}
                {/*    <Products category={CAT_BOOKS} /> */}
                {/* </Route> */}
                {/* <Route exact path={CAT_AUTO}> */}
                {/*    <Products category={CAT_AUTO} /> */}
                {/* </Route> */}
                {/* <Route exact path={CAT_SPORTS}> */}
                {/*    <Products category={CAT_SPORTS} /> */}
                {/* </Route> */}
                {/* <Route exact path={CAT_GAMES}> */}
                {/*    <Products category={CAT_GAMES} /> */}
                {/* </Route> */}
                {/* <Route exact path={CAT_HEALTH}> */}
                {/*    <Products category={CAT_HEALTH} /> */}
                {/* </Route> */}
                {/* <Route path="*" component={ProtectedHandler} /> */}
            </Switch>
        </>
    );
};

export default Routes;
