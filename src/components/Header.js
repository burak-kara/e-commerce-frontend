import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Badge } from '@material-ui/core';
import { favicon, logo } from '../_assets';
import {
    BASKET,
    LANDING,
    ORDERS,
    P_M_ITEMS,
    P_M_REVIEWS,
    PROFILE,
    SM_CAMPAIGNS,
    SM_ORDERS,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    SEARCH,
    ORDER_STATUS,
    SM_ANALYSIS,
    ADMIN,
} from '../_constants';
import { Account, BasketIcon, DropDown, Search } from '../_utilities/icons';
import { openAlert } from '../_redux/actions';
import { withFirebase } from '../_firebase';

const Header = (props) => {
    const { firebase } = props;
    const history = useHistory();
    const { basket } = useStore().getState();
    const { user } = useStore().getState();
    const [search, setSearch] = useState('');

    setInterval(() => {
        const database = firebase.user_db(user.pk);
        if (!user.is_product_manager && !user.is_sales_manager) {
            database.once('child_changed', (response) => {
                const { order_id, order_status, order_address } = response.val();
                if (
                    Notification.permission === 'granted' &&
                    (order_status >= 0 || order_address !== '')
                ) {
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification('OzU E-Commerce', {
                            body:
                                `Your order with the ID of ${order_id} has been updated!\n` +
                                `${ORDER_STATUS[order_status]}\n` +
                                `${order_address}`,
                            image: logo,
                            icon: favicon,
                            tag: order_id,
                            requireInteraction: true,
                            vibrate: [200, 100, 200],
                        });
                    });
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
    }, 1000);

    setInterval(() => {
        const database = firebase.campaign_db_for_users();
        if (!user.is_product_manager && !user.is_sales_manager) {
            database.once('child_changed', (response) => {
                const { id, valid_until, campaign_x, campaign_y, campaign_amount } = response.val();
                if (
                    Notification.permission === 'granted' &&
                    (campaign_x >= 1 || campaign_y >= 1)
                ) {
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification('OzU E-Commerce', {
                            body:
                                `Buy ${campaign_x} get ${campaign_y} campaign has begun!\n` +
                                `including a hefty ${campaign_amount}% discount!\n` +
                                `This campaign is valid until ${valid_until}`,
                            image: logo,
                            icon: favicon,
                            tag: id,
                            requireInteraction: true,
                            vibrate: [200, 100, 200],
                        });
                    });
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
    }, 1000);

    const Banner = () => {
        let user_type = '';
        if (user.is_product_manager) {
            user_type = 'Product Manager';
        }
        if (user.is_sales_manager) {
            user_type = 'Sales Manager';
        }
        if (user.is_admin) {
            user_type = 'Admin';
        }
        return <div className="banner">{user_type}</div>;
    };

    const RenderCommonMenu = () => (
        <NavDropdown.Item
            key="user-profile"
            className="menu-btn"
            onClick={() => {
                history.push({
                    pathname: PROFILE,
                });
            }}
        >
            Profile
        </NavDropdown.Item>
    );

    const RenderCustomerMenu = () => (
        <NavDropdown.Item
            key="prev-orders"
            className="menu-btn"
            onClick={() => {
                history.push({
                    pathname: ORDERS,
                });
            }}
        >
            Previous Orders
        </NavDropdown.Item>
    );

    const RenderProductManagerMenu = () => (
        <>
            <NavDropdown.Item
                key="manage-products"
                className="menu-btn"
                onClick={() => {
                    history.push({
                        pathname: P_M_ITEMS,
                    });
                }}
            >
                Manage Products
            </NavDropdown.Item>
            <NavDropdown.Item
                key="product-reviews"
                className="menu-btn"
                onClick={() => {
                    history.push({
                        pathname: P_M_REVIEWS,
                    });
                }}
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
                onClick={() => {
                    history.push({
                        pathname: SM_CAMPAIGNS,
                    });
                }}
            >
                Manage Campaigns
            </NavDropdown.Item>
            <NavDropdown.Item
                key="manage-orders"
                className="menu-btn"
                onClick={() => {
                    history.push({
                        pathname: SM_ORDERS,
                    });
                }}
            >
                Manage Orders
            </NavDropdown.Item>
            <NavDropdown.Item
                key="analysis"
                className="menu-btn"
                onClick={() => {
                    history.push({
                        pathname: SM_ANALYSIS,
                    });
                }}
            >
                Sales Analysis
            </NavDropdown.Item>
        </>
    );

    const RenderAdminMenu = () => (
        <>
            <NavDropdown.Item
                key="admin-console"
                className="menu-btn"
                onClick={() => {
                    history.push({
                        pathname: ADMIN,
                    });
                }}
            >
                Admin Console
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
            if (!user.is_product_manager && !user.is_sales_manager && !user.is_admin) {
                renders.push(<RenderCustomerMenu key="1" />);
            }
            if (user.is_admin) {
                renders.push(<RenderAdminMenu key="4" />);
            }
            renders.push(
                <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                        key="logout"
                        className="menu-btn"
                        onClick={() => {
                            history.push({
                                pathname: SIGN_OUT,
                            });
                        }}
                    >
                        Logout
                    </NavDropdown.Item>
                </>,
            );

            return renders;
        }
        return (
            <>
                <NavDropdown.Item
                    key="sign-in"
                    className="menu-btn"
                    onClick={() => {
                        history.push({
                            pathname: SIGN_IN,
                        });
                    }}
                >
                    Sign in
                </NavDropdown.Item>
                <NavDropdown.Item
                    key="sign-up"
                    className="menu-btn"
                    onClick={() => {
                        history.push({
                            pathname: SIGN_UP,
                        });
                    }}
                >
                    Sign up
                </NavDropdown.Item>
            </>
        );
    };

    const renderBasketButton = () => (
        <button
            className="btn b-btn"
            name="Go to Basket"
            type="button"
            onClick={() => {
                history.push({
                    pathname: BASKET,
                });
            }}
        >
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
                        onClick={() => {
                            history.push({
                                pathname: LANDING,
                            });
                        }}
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
                                    name="Search"
                                    type="button"
                                    onClick={() => {
                                        history.push({
                                            pathname: `${SEARCH}/${search}`,
                                            state: { search },
                                        });
                                    }}
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

export default connect(mapStateToProps, { openAlert })(withFirebase(Header));
