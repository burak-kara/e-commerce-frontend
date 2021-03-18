import React from 'react';
import { FaRegUser, RiShoppingCartLine } from 'react-icons/all';
import { IconContext } from 'react-icons';
import logo from '../../_assets/logo2.png';

const Header = () => {
    const Account = () => (
        <IconContext.Provider value={{ color: 'white', size: '1em' }}>
            <FaRegUser />
        </IconContext.Provider>
    );

    const Basket = () => (
        <IconContext.Provider value={{ color: 'white', size: '1em' }}>
            <RiShoppingCartLine />
        </IconContext.Provider>
    );

    const handleSearchClick = () => {
        console.log('Search Click');
    };

    const handleAccountClick = () => {
        console.log('Account Click');
    };

    const handleBasketClick = () => {
        console.log('Basket Click');
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
                                placeholder="Search.."
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-dark h-100 search-btn"
                                    type="button"
                                    onClick={() => handleSearchClick()}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="h-btn-container">
                            <button
                                className="btn btn-dark h-btn mr-2"
                                type="button"
                                onClick={() => handleAccountClick()}
                            >
                                <Account />
                                <div className="ml-1">Account</div>
                            </button>
                            <button
                                className="btn btn-dark h-btn"
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
