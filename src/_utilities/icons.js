import React from 'react';
import { IconContext } from 'react-icons/lib';
import { FaSearch, FaRegUser } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { RiShoppingCartLine } from 'react-icons/ri';

const Search = (props) => (
    <IconContext.Provider value={{ ...props }}>
        <div>
            <FaSearch />
        </div>
    </IconContext.Provider>
);

const Account = (props) => (
    <IconContext.Provider value={{ ...props }}>
        <div>
            <FaRegUser />
        </div>
    </IconContext.Provider>
);

const DropDown = (props) => (
    <IconContext.Provider value={{ ...props }}>
        <div>
            <IoIosArrowDropdownCircle />
        </div>
    </IconContext.Provider>
);

const Basket = (props) => (
    <IconContext.Provider value={{ ...props }}>
        <div>
            <RiShoppingCartLine />
        </div>
    </IconContext.Provider>
);

export { Search, Account, DropDown, Basket };
