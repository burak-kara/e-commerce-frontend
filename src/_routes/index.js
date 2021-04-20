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
    OrderDetail,
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
    CAT_CONSUMABLES,
    CAT_FASHION,
    CAT_LIFE,
    CAT_HOBBY,
    CAT_TOYS,
    CAT_COSMETICS,
    CAT_OTHERS,
    UN_AUTHORIZED,
    UN_AUTHENTICATED,
    NOT_FOUND,
    ORDER_DETAIL,
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
                <CustomerRoute exact path={ORDER_DETAIL} component={OrderDetail} />

                {/* Routes for product managers */}
                <ProductManagerRoute exact path={P_M_ITEMS} component={Items} />
                <ProductManagerRoute exact path={P_M_NEW_ITEM} component={ItemSingleView} />
                <ProductManagerRoute exact path={P_M_EDIT_ITEM} component={ItemSingleView} />

                {/* Categories */}
                <Route exact path={CAT_ELECTRONICS}>
                    <Products category={CAT_ELECTRONICS} />
                </Route>
                <Route exact path={CAT_CONSUMABLES}>
                    <Products category={CAT_CONSUMABLES} />
                </Route>
                <Route exact path={CAT_FASHION}>
                    <Products category={CAT_FASHION} />
                </Route>
                <Route exact path={CAT_LIFE}>
                    <Products category={CAT_LIFE} />
                </Route>
                <Route exact path={CAT_HOBBY}>
                    <Products category={CAT_HOBBY} />
                </Route>
                <Route exact path={CAT_TOYS}>
                    <Products category={CAT_TOYS} />
                </Route>
                <Route exact path={CAT_COSMETICS}>
                    <Products category={CAT_COSMETICS} />
                </Route>
                <Route exact path={CAT_OTHERS}>
                    <Products category={CAT_OTHERS} />
                </Route>

                <Route exact path={UN_AUTHORIZED} component={UnAuthorized} />
                <Route exact path={UN_AUTHENTICATED} component={UnAuthenticated} />
                <Route exact path={NOT_FOUND} component={NotFound} />
                <NotFoundRoute path="*" component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
