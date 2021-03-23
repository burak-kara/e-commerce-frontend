import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../_assets';
import { Search, Account, DropDown, Basket } from '../../_utilities/icons';
import { BASKET, PROFILE, LANDING, SETTINGS, ORDERS } from '../../_constants';

const Header = () => {
    const history = useHistory();

    const handleLogoClick = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const handleSearchClick = () => {
        history.push({
            pathname: PROFILE,
        });
    };

    const handleAccountClick = () => {
        history.push({
            pathname: PROFILE,
        });
    };

    const handleOrdersClick = () => {
        history.push({
            pathname: ORDERS,
        });
    };

    const handleSettingsClick = () => {
        history.push({
            pathname: SETTINGS,
        });
    };

    const handleBasketClick = () => {
        history.push({
            pathname: BASKET,
        });
    };

    // TODO delete
    const user = {
        name: 'John',
        surname: 'Doe',
    };

    const DropdownIcon = () => <DropDown color="color" size="1em" />;

    return (
        <div className="header ">
            <div className="container h-100">
                <nav className="navbar navbar-expand-lg h-100 ">
                    <button
                        className="header-brand"
                        type="button"
                        onClick={() => handleLogoClick()}
                    >
                        {/* TODO onClick */}
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
                                    onClick={() => handleSearchClick()}
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
                                    onClick={() => handleAccountClick()}
                                >
                                    <Account />
                                    <p className="name">{user.name}</p>
                                    <DropdownIcon />
                                </button>
                                <div className="dropdown-menu">
                                    <button
                                        className="dropdown-item menu-btn"
                                        type="button"
                                        onClick={() => handleAccountClick()}
                                    >
                                        Profile
                                    </button>
                                    <div className="dropdown-divider" />
                                    <button
                                        className="dropdown-item menu-btn"
                                        type="button"
                                        onClick={() => handleOrdersClick()}
                                    >
                                        Orders
                                    </button>
                                    <div className="dropdown-divider" />
                                    <button
                                        className="dropdown-item menu-btn"
                                        type="button"
                                        onClick={() => handleSettingsClick()}
                                    >
                                        Settings
                                    </button>
                                    <div className="dropdown-divider md-b" />
                                    <button className="dropdown-item menu-btn" type="button">
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <button
                                className="btn b-btn"
                                type="button"
                                onClick={() => handleBasketClick()}
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

export default Header;
