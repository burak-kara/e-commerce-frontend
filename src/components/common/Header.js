import React from 'react';
import { FaSearch, FaRegUser, RiShoppingCartLine, RiArrowDropDownLine } from 'react-icons/all';
import { IconContext } from 'react-icons';
import logo from '../../_assets';

const Header = () => {
    const Search = () => (
        <IconContext.Provider value={{ color: 'white', size: '1em' }}>
            <FaSearch />
        </IconContext.Provider>
    );

    const Account = () => (
        <IconContext.Provider value={{ color: 'white', size: '2em' }}>
            <FaRegUser />
        </IconContext.Provider>
    );

    const DropDown = () => (
        <IconContext.Provider value={{ color: 'white', size: '2em' }}>
            <RiArrowDropDownLine />
        </IconContext.Provider>
    );

    const Basket = () => (
        <IconContext.Provider value={{ color: 'white', size: '2em' }}>
            <RiShoppingCartLine />
        </IconContext.Provider>
    );

    const handleSearchClick = () => {
        console.log('Search Click');
    };

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
                                    className="btn btn-dark h-btn mr-2"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <Account />
                                    <div className="ml-2">Account</div>
                                    <DropDown />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
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
                            <div className="btn-group">
                                <button
                                    className="btn btn-dark h-btn mr-2"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <Basket />
                                    <div className="ml-2">Basket</div>
                                    <DropDown />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
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
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
