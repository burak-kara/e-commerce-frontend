import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Badge } from '@material-ui/core';
import { logo } from '../_assets';
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
} from '../_constants';
import { Account, BasketIcon, DropDown, Search } from '../_utilities/icons';
import { openAlert } from '../_redux/actions';

const Header2 = () => {
    const history = useHistory();
    const { basket } = useStore().getState();
    const { user } = useStore().getState();

    const handleLogo = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const handleSearch = () => {
        history.push({
            pathname: PROFILE,
        });
    };

    const handleAccount = () => {
        history.push({
            pathname: user && user.first_name ? PROFILE : SIGN_IN,
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

    const handleManageItems = () => {
        history.push({
            pathname: P_M_ITEMS,
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

    const RenderCommonMenu = () => (
        <>
            <NavDropdown.Item className="menu-btn" onClick={() => handleAccount()}>
                Profile
            </NavDropdown.Item>
            <NavDropdown.Item className="menu-btn" onClick={() => handleSettings()}>
                Settings
            </NavDropdown.Item>
        </>
    );

    const RenderCustomerMenu = () => (
        <>
            <NavDropdown.Item className="menu-btn" nClick={() => handleOrders()}>
                Orders
            </NavDropdown.Item>
        </>
    );

    const RenderProductManagerMenu = () => (
        <>
            <NavDropdown.Item className="menu-btn" nClick={() => handleManageItems()}>
                Manage Items
            </NavDropdown.Item>
        </>
    );

    // TODO put proper menu
    const RenderSalesManagerMenu = () => (
        <>
            <NavDropdown.Item className="menu-btn" nClick={() => handleManageItems()}>
                Create Campaign
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
                    <NavDropdown.Item className="menu-btn" nClick={() => handleSignOut()}>
                        Logout
                    </NavDropdown.Item>
                </>,
            );

            return renders;
        }
        return (
            <>
                <NavDropdown.Item className="menu-btn" nClick={() => handleSignUp()}>
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
                <Navbar collapseOnSelect sticky="top" expand="lg" className="header">
                    <Navbar.Brand className="header-brand" onClick={() => handleLogo()}>
                        <img className="logo" src={logo} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control search-bar"
                                placeholder="Ürün, Kategori ya da Marka ara"
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
                        <Nav className="ml-auto">
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
                                            <span className="name">Login</span>
                                        </div>
                                    )
                                }
                                id="collasible-nav-dropdown"
                                className="a-btn"
                                onClick={() => handleAccount()}
                            >
                                {renderMenu()}
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item>
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

export default connect(mapStateToProps, { openAlert })(Header2);
