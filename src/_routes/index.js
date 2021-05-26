import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import ProductManagerRoute from './ProductManagerRoute';
import CustomerRoute from './CustomerRoute';
// import AdminRoute from './AdminRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnAuthenticatedRoute from './UnAuthenticatedRoute';
import SalesManagerRoute from './SalesManagerRoute';
import NotFoundRoute from './NotFoundRoute';
import {
    UnAuthorized,
    UnAuthenticated,
    NotFound,
    DayByDayRevenue,
    Top5SoldAllTime,
    Top5SoldAllTimeShare,
    TotalSoldByDay,
} from '../pages';
import {
    BASKET,
    LANDING,
    ORDERS,
    // ADMIN,
    P_M_ITEMS,
    P_M_NEW_ITEM,
    P_M_EDIT_ITEM,
    PROFILE,
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
    P_M_REVIEWS,
    SM_ORDERS,
    SM_CAMPAIGNS,
    SM_ORDER_STATUS,
    SM_ANALYSIS,
    PRODUCT_DETAIL,
    SEARCH,
    SM_ANALYSIS_DAY_BY_DAY,
    SM_ANALYSIS_SOLD,
    SM_ANALYSIS_SOLD_SHARE,
    SM_ANALYSIS_TOTAL_SOLD,
} from '../_constants';

const Header = loadable(() => import('../components/Header'));
const Navigation = loadable(() => import('../components/Navigation'));

const Home = loadable(() => import('../pages/home/Home'));
const Basket = loadable(() => import('../pages/basket/Basket'));
const ManageCampaigns = loadable(() => import('../pages/manage_campaigns/ManageCampaigns'));
const ManageOrders = loadable(() => import('../pages/manage_orders/ManageOrders'));
const OrderStatus = loadable(() => import('../pages/manage_orders/OrderStatus'));
const Items = loadable(() => import('../pages/manage_products/Items'));
const ItemSingleView = loadable(() => import('../pages/manage_products/ItemSingleView'));
const Reviews = loadable(() => import('../pages/manage_reviews/Reviews'));
const Orders = loadable(() => import('../pages/previous_orders/Orders'));
const OrderDetail = loadable(() => import('../pages/previous_orders/OrderDetail'));
const ProductDetail = loadable(() => import('../pages/products/ProductDetail'));
const Products = loadable(() => import('../pages/products/Products'));
const Profile = loadable(() => import('../pages/profile/Profile'));
const SalesAnalysis = loadable(() => import('../pages/sales_analysis/SalesAnalysis'));

const Signin = loadable(() => import('../pages/signin/Signin'));
const Signup = loadable(() => import('../pages/signup/Signup'));
const Signout = loadable(() => import('../pages/signout/Signout'));

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
                <Route exact path={PRODUCT_DETAIL} component={ProductDetail} />
                <Route path={SEARCH} component={Products} />

                {/* Common Routes for not logged in users */}
                <UnAuthenticatedRoute exact path={SIGN_IN} component={Signin} />
                <UnAuthenticatedRoute exact path={SIGN_UP} component={Signup} />

                {/* Common Routes for logged in users */}
                <AuthenticatedRoute exact path={PROFILE} component={Profile} />
                <AuthenticatedRoute exact path={SIGN_OUT} component={Signout} />

                {/* Routes for customers */}
                <CustomerRoute exact path={ORDERS} component={Orders} />
                <CustomerRoute exact path={ORDER_DETAIL} component={OrderDetail} />

                {/* Routes for admins */}
                {/* <AdminRoute exact path={ADMIN} component={Admin} /> */}

                {/* Routes for product managers */}
                <ProductManagerRoute exact path={P_M_ITEMS} component={Items} />
                <ProductManagerRoute exact path={P_M_NEW_ITEM} component={ItemSingleView} />
                <ProductManagerRoute exact path={P_M_EDIT_ITEM} component={ItemSingleView} />
                <ProductManagerRoute exact path={P_M_REVIEWS} component={Reviews} />

                {/* Routes for sales managers */}
                <SalesManagerRoute exact path={SM_ORDERS} component={ManageOrders} />
                <SalesManagerRoute exact path={SM_ORDER_STATUS} component={OrderStatus} />
                <SalesManagerRoute exact path={SM_CAMPAIGNS} component={ManageCampaigns} />
                <SalesManagerRoute exact path={SM_ANALYSIS} component={SalesAnalysis} />
                <SalesManagerRoute
                    exact
                    path={SM_ANALYSIS_DAY_BY_DAY}
                    component={DayByDayRevenue}
                />
                <SalesManagerRoute exact path={SM_ANALYSIS_SOLD} component={Top5SoldAllTime} />
                <SalesManagerRoute
                    exact
                    path={SM_ANALYSIS_SOLD_SHARE}
                    component={Top5SoldAllTimeShare}
                />
                <SalesManagerRoute exact path={SM_ANALYSIS_TOTAL_SOLD} component={TotalSoldByDay} />

                {/* Common Routes for all users */}
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
