import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { logo } from '../_assets';
import { openAlert } from '../_redux/actions';
import { Search, Account, DropDown, Basket } from '../_utilities/icons';
import {
    BASKET,
    PROFILE,
    LANDING,
    SETTINGS,
    ORDERS,
    SIGN_OUT,
    P_M_ITEMS,
    SIGN_IN,
    SIGN_UP,
    COSTUMER,
    PM,
    SM,
} from '../_constants';

const Header = () => {
    const history = useHistory();
    const user = useStore().getState().session;
    // TODO fix get from redux store

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
            pathname: user ? PROFILE : SIGN_IN,
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

    const renderAccountButton = () =>
        user && user.first_name ? (
            <>
                <Account />
                <p className="name">{user.first_name}</p>
                <DropdownIcon />
            </>
        ) : (
            <p className="name">Login</p>
        );

    const RenderCommonMenu = () => (
        <>
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleAccount()}
            >
                Profile
            </button>
            <div className="dropdown-divider" />
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleSettings()}
            >
                Settings
            </button>
        </>
    );

    const RenderCustomerMenu = () => (
        <>
            <div className="dropdown-divider" />
            <button className="dropdown-item menu-btn" type="button" onClick={() => handleOrders()}>
                Orders
            </button>
            <div className="dropdown-divider md-b" />
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleSignOut()}
            >
                Logout
            </button>
        </>
    );

    const RenderProductManagerMenu = () => (
        <>
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleManageItems()}
            >
                Manage Items
            </button>
            <div className="dropdown-divider md-b" />
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleSignOut()}
            >
                Logout
            </button>
        </>
    );

    // TODO
    const RenderSalesManagerMenu = () => (
        <>
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleManageItems()}
            >
                Manage Items
            </button>
            <div className="dropdown-divider md-b" />
            <button
                className="dropdown-item menu-btn"
                type="button"
                onClick={() => handleSignOut()}
            >
                Logout
            </button>
        </>
    );

    const renderMenu = () => {
        if (user && user.first_name) {
            const renders = [<RenderCommonMenu />];
            if (user.role === COSTUMER) {
                renders.push(<RenderCustomerMenu />);
            }
            if (user.role === PM) {
                renders.push(<RenderProductManagerMenu />);
            }
            if (user.role === SM) {
                renders.push(<RenderSalesManagerMenu />);
            }
            return renders;
        }
        return (
            <>
                <button
                    className="dropdown-item menu-btn"
                    type="button"
                    onClick={() => handleSignUp()}
                >
                    Sign up
                </button>
            </>
        );
    };

    const DropdownIcon = () => <DropDown color="color" size="1em" />;

    return (
        <div className="header ">
            <div className="container h-100">
                <nav className="navbar navbar-expand-lg h-100 ">
                    <button className="header-brand" type="button" onClick={() => handleLogo()}>
                        <img className="logo" src={logo} alt="logo" />
                    </button>
                    <div className="collapse navbar-collapse h-50 justify-content-end">
                        <div
                            className="form-inline input-group w-75
                                h-100 mr-3 justify-content-end"
                        >
                            <input
                                type="text"
                                className="form-control h-100 search-bar"
                                placeholder="Ürün, Kategori ya da Marka ara"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-dark h-100 search-btn"
                                    type="button"
                                    onClick={() => handleSearch()}
                                >
                                    <Search />
                                    <div className="ml-1">Search</div>
                                </button>
                            </div>
                        </div>
                        <div className="h-btn-container">
                            <div className="btn-group">
                                <button
                                    className="btn btn-dark a-btn mr-2"
                                    type="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onClick={() => handleAccount()}
                                >
                                    {renderAccountButton()}
                                </button>
                                <div className="dropdown-menu">{renderMenu()}</div>
                            </div>
                            <button
                                className="btn b-btn"
                                type="button"
                                onClick={() => handleBasket()}
                            >
                                <Basket />
                                <div className="ml-1">Basket</div>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default connect(null, { openAlert })(Header);
