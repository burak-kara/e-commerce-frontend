import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Header, Navigation } from '../components';
import ProductManagerRoute from './ProductManagerRoute';
import CustomerRoute from './CustomerRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnAuthenticatedRoute from './UnAuthenticatedRoute';
import NotFoundRoute from './NotFoundRoute';
import {
    Basket,
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
    UnAuthorized,
    UnAuthenticated,
    NotFound,
} from '../pages';
import {
    BASKET,
    LANDING,
    ORDERS,
    P_M_ITEMS,
    P_M_NEW_ITEM,
    P_M_EDIT_ITEM,
    PROFILE,
    SETTINGS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    CAT_ELECTRONICS,
    CAT_OTHERS,
    CAT_CONSUMABLES,
    CAT_COFFEE_BEANS,
    UN_AUTHORIZED,
    UN_AUTHENTICATED,
    NOT_FOUND,
} from '../_constants';

const Routes = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {}, [location]);

    const isHeader = () => {
        const { pathname } = history.location;
        return (
            pathname === SIGN_UP ||
            pathname === SIGN_IN ||
            pathname === UN_AUTHORIZED ||
            pathname === UN_AUTHENTICATED ||
            pathname === NOT_FOUND
        );
    };

    const RenderHeader = () =>
        isHeader() ? null : (
            <>
                <div className="sticky-top">
                    <Header />
                </div>
                <Navigation />
            </>
        );

    return (
        <>
            <RenderHeader />

            <Switch>
                {/* Common Routes for all users */}
                <Route exact path={LANDING} component={Home} />
                <Route exact path={BASKET} component={Basket} />

                {/* Common Routes for not logged in users */}
                <UnAuthenticatedRoute exact path={SIGN_IN} component={Signin} />
                <UnAuthenticatedRoute exact path={SIGN_UP} component={Signup} />

                {/* Common Routes for logged in users */}
                <AuthenticatedRoute exact path={PROFILE} component={Profile} />
                <AuthenticatedRoute exact path={SETTINGS} component={Settings} />
                <AuthenticatedRoute exact path={SIGN_OUT} component={Signout} />

                {/* Routes for customers */}
                <CustomerRoute exact path={ORDERS} component={Orders} />

                {/* Routes for product managers */}
                <ProductManagerRoute exact path={P_M_ITEMS} component={Items} />
                <ProductManagerRoute exact path={P_M_NEW_ITEM} component={ItemSingleView} />
                <ProductManagerRoute exact path={P_M_EDIT_ITEM} component={ItemSingleView} />

                {/* Categories */}
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

                <Route exact path={UN_AUTHORIZED} component={UnAuthorized} />
                <Route exact path={UN_AUTHENTICATED} component={UnAuthenticated} />
                <Route exact path={NOT_FOUND} component={NotFound} />
                <NotFoundRoute path="*" component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
