import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Badge } from '@material-ui/core';
import firebase from 'firebase';
import { logo } from '../_assets';
import {
    BASKET,
    LANDING,
    ORDERS,
    P_M_ITEMS,
    P_M_REVIEWS,
    PROFILE,
    S_M_CAMPAIGNS,
    S_M_ORDERS,
    SETTINGS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    SEARCH,
} from '../_constants';
import { Account, BasketIcon, DropDown, Search } from '../_utilities/icons';
import { openAlert } from '../_redux/actions';

const Header = (props) => {
    const history = useHistory();
    const { basket } = useStore().getState();
    const { user } = useStore().getState();
    const [search, setSearch] = useState('');

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    const fireBaseConfig = {
        apiKey: "AIzaSyCsVmQ0R8nX7QTZFJxgZNemFT4urDBW7J0",
        authDomain: "e-commerce-ozu.firebaseapp.com",
        databaseURL: "https://e-commerce-ozu-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "e-commerce-ozu",
        storageBucket: "e-commerce-ozu.appspot.com",
        messagingSenderId: "115048619599",
        appId: "1:115048619599:web:609b04692351d188f7943a",
        measurementId: "G-JTW10KDD0C"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(fireBaseConfig);
    } else {
        firebase.app();
    }

    let notify = null;
    let notification_user_type = 'normal_user';

    if (user.is_product_manager)
    notification_user_type = 'product_manager';
    if (user.is_sales_manager)
    notification_user_type = 'sales_manager';
        const database = firebase.database().ref().child(`/notifications/${user.pk}`);
    if (notification_user_type === 'normal_user') {
        database.once('child_changed', (data) => {
            if (Notification.permission !== 'default'
                && Notification.permission !== 'denied'
                && data.val().order_status >= 0) {
                notify = new Notification('OzU E-Commerce', {
                    'body': `Your order with the ID of ${data.val().order_id} has been updated!`,
                    'image': { logo },
                    'tag': data.val(),
                    'requireInteraction': true
                });
                notify.onClick = () => {
                    notify.close();
                };
            } else if (Notification.permission !== 'granted') {
                props.openAlert({
                    message: 'Please allow us to send you notifications!',
                    severity: 'error',
                });
            } else {
                props.openAlert({
                    message: 'Something went wrong with the push notifications!',
                    severity: 'error',
                });
            }
        });
    }
    
    const handleLogo = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const handleSearch = () => {
        history.push({
            pathname: `${SEARCH}/${search}`,
            state: { search },
        });
    };

    const handleAccount = () => {
        history.push({
            pathname: PROFILE,
        });
    };

    const handleOrders = () => {
        history.push({
            pathname: ORDERS,
        });
    };

    const handleSettings = () => {
        history.push({
            pathname: SETTINGS,
        });
    };

    const handleManageProducts = () => {
        history.push({
            pathname: P_M_ITEMS,
        });
    };

    const handleProductReviews = () => {
        history.push({
            pathname: P_M_REVIEWS,
        });
    };

    const handleManageCampaigns = () => {
        history.push({
            pathname: S_M_CAMPAIGNS,
        });
    };

    const handleSMOrders = () => {
        history.push({
            pathname: S_M_ORDERS,
        });
    };

    const handleSignIn = () => {
        history.push({
            pathname: SIGN_IN,
        });
    };

    const handleSignUp = () => {
        history.push({
            pathname: SIGN_UP,
        });
    };

    const handleSignOut = () => {
        history.push({
            pathname: SIGN_OUT,
        });
    };

    const handleBasket = () => {
        history.push({
            pathname: BASKET,
        });
    };

    const Banner = () => {
        let user_type = '';
        if (user.is_product_manager) {
            user_type = 'Product Manager';
        }
        if (user.is_sales_manager) {
            user_type = 'Sales Manager';
        }
        return <div className="banner">{user_type}</div>;
    };

    const RenderCommonMenu = () => (
        <>
            <NavDropdown.Item
                key="user-profile"
                className="menu-btn"
                onClick={() => handleAccount()}
            >
                Profile
            </NavDropdown.Item>
            <NavDropdown.Item key="settings" className="menu-btn" onClick={() => handleSettings()}>
                Settings
            </NavDropdown.Item>
        </>
    );

    const RenderCustomerMenu = () => (
        <>
            <NavDropdown.Item key="prev-orders" className="menu-btn" onClick={() => handleOrders()}>
                Previous Orders
            </NavDropdown.Item>
        </>
    );

    const RenderProductManagerMenu = () => (
        <>
            <NavDropdown.Item
                key="manage-products"
                className="menu-btn"
                onClick={() => handleManageProducts()}
            >
                Manage Products
            </NavDropdown.Item>
            <NavDropdown.Item
                key="product-reviews"
                className="menu-btn"
                onClick={() => handleProductReviews()}
            >
                Product Reviews
            </NavDropdown.Item>
        </>
    );

    const RenderSalesManagerMenu = () => (
        <>
            <NavDropdown.Item
                key="manage-campaigns"
                className="menu-btn"
                onClick={() => handleManageCampaigns()}
            >
                Manage Campaigns
            </NavDropdown.Item>
            <NavDropdown.Item
                key="manage-orders"
                className="menu-btn"
                onClick={() => handleSMOrders()}
            >
                Manage Orders
            </NavDropdown.Item>
        </>
    );

    const renderMenu = () => {
        if (user && user.first_name) {
            const renders = [<RenderCommonMenu key="0" />];
            if (user.is_product_manager) {
                renders.push(<RenderProductManagerMenu key="2" />);
            }
            if (user.is_sales_manager) {
                renders.push(<RenderSalesManagerMenu key="3" />);
            }
            if (!user.is_product_manager && !user.is_sales_manager) {
                renders.push(<RenderCustomerMenu key="1" />);
            }
            renders.push(
                <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                        key="logout"
                        className="menu-btn"
                        onClick={() => handleSignOut()}
                    >
                        Logout
                    </NavDropdown.Item>
                </>,
            );

            return renders;
        }
        return (
            <>
                <NavDropdown.Item key="sign-in" className="menu-btn" onClick={() => handleSignIn()}>
                    Sign in
                </NavDropdown.Item>
                <NavDropdown.Item key="sign-up" className="menu-btn" onClick={() => handleSignUp()}>
                    Sign up
                </NavDropdown.Item>
            </>
        );
    };

    const renderBasketButton = () => (
        <button className="btn b-btn" type="button" onClick={() => handleBasket()}>
            <BasketIcon />
            <div className="ml-1">Basket</div>
        </button>
    );

    return (
        <div className="header-container">
            <Container fluid="xl" className="container">
                <Banner />
            </Container>
            <Container fluid="xl" className="container">
                <Navbar collapseOnSelect expand="lg" className="header">
                    <Navbar.Brand
                        className="header-brand mb-1 mb-xl-0"
                        onClick={() => handleLogo()}
                    >
                        <img className="logo" src={logo} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="collapsible-container">
                        <div className="input-group  mb-1 mb-xl-0">
                            <input
                                type="text"
                                className="form-control search-bar"
                                placeholder="Search Products..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-dark btn-block h-100 search-btn"
                                    type="button"
                                    onClick={() => handleSearch()}
                                >
                                    <Search />
                                    <div className="ml-1">Search</div>
                                </button>
                            </div>
                        </div>
                        <Nav className="ml-auto mb-1 mb-xl-0">
                            <NavDropdown
                                title={
                                    user && user.first_name ? (
                                        <div className="inner-container">
                                            <Account key="account" className="mr-2" />
                                            <span className="name" key="name">
                                                {user.first_name}
                                            </span>
                                            <DropDown key="icon" className="ml-2" size="1em" />
                                        </div>
                                    ) : (
                                        <div className="inner-container">
                                            <span className="name">Sign in</span>
                                        </div>
                                    )
                                }
                                id="collasible-nav-dropdown"
                                className="a-btn"
                            >
                                {renderMenu()}
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item key="basket" className="b-item">
                                {basket.itemCount === 0 ? (
                                    <div className="badge">{renderBasketButton()}</div>
                                ) : (
                                    <Badge
                                        max={10}
                                        badgeContent={basket.itemCount}
                                        className="badge"
                                        color="primary"
                                        overlap="circle"
                                    >
                                        {renderBasketButton()}
                                    </Badge>
                                )}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => state.basket;

export default connect(mapStateToProps, { openAlert })(Header);
