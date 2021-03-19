import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../_assets';
import { Search, Account, DropDown, Basket } from '../../_utilities/icons';
import { BASKET } from '../../_constants';

const Header = () => {
    const history = useHistory();

    const handleSearchClick = () => {
        console.log('Search Click');
    };

    const handleBasketClick = () => {
        history.push({
            pathname: BASKET,
        });
    };

    const DropdownIcon = () => <DropDown color="color" size="1em" />;

    return (
        <div className="header ">
            <div className="container h-100">
                <nav className="navbar navbar-expand-lg h-100 ">
                    <a className="header-brand" href="http://localhost:3000/">
                        {/* TODO onClick */}
                        <img className="logo" src={logo} alt="logo" />
                    </a>
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
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <Account />
                                    <span>Account</span>
                                    <DropdownIcon />
                                </button>
                                <div className="dropdown-menu dropdown-menu">
                                    <button className="dropdown-item" type="button">
                                        Action
                                    </button>
                                    <button className="dropdown-item" type="button">
                                        Another action
                                    </button>
                                    <button className="dropdown-item" type="button">
                                        Something else here
                                    </button>
                                </div>
                            </div>
                            <button
                                className="btn btn-dark b-btn"
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
