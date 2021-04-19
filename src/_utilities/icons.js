import React from 'react';
import { IconContext } from 'react-icons/lib';
import { FaSearch, FaRegUser } from 'react-icons/fa';
import {
    IoIosArrowDropdownCircle,
    IoIosStarHalf,
    IoIosStarOutline,
    IoIosStar,
} from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { RiShoppingCartLine } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';
import { MdFavoriteBorder, MdAdd, MdEdit, MdDelete, MdTimelapse } from 'react-icons/md';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { SiShopify } from 'react-icons/si';
import { GiPathDistance } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';

const IconMaker = (props) => {
    const { icon } = props;
    return (
        <IconContext.Provider value={{ ...props }}>
            <div>{icon}</div>
        </IconContext.Provider>
    );
};

const Search = (props) => <IconMaker icon={<FaSearch />} {...props} />;

const Account = (props) => <IconMaker icon={<FaRegUser />} {...props} />;

const DropDown = (props) => <IconMaker icon={<IoIosArrowDropdownCircle />} {...props} />;

const BasketIcon = (props) => <IconMaker icon={<RiShoppingCartLine />} {...props} />;

const Hide = (props) => <IconMaker icon={<BiHide />} {...props} />;

const Show = (props) => <IconMaker icon={<BiShow />} {...props} />;

const FilledStar = (props) => <IconMaker icon={<IoIosStar />} {...props} />;

const HalfStar = (props) => <IconMaker icon={<IoIosStarHalf />} {...props} />;

const EmptyStar = (props) => <IconMaker icon={<IoIosStarOutline />} {...props} />;

const Favorite = (props) => <IconMaker icon={<MdFavoriteBorder />} {...props} />;

const Add = (props) => <IconMaker icon={<MdAdd />} {...props} />;

const Edit = (props) => <IconMaker icon={<MdEdit />} {...props} />;

const Delete = (props) => <IconMaker icon={<MdDelete />} {...props} />;

const Plus = (props) => <IconMaker icon={<AiOutlinePlusCircle />} {...props} />;

const Minus = (props) => <IconMaker icon={<AiOutlineMinusCircle />} {...props} />;

const Arrived = (props) => <IconMaker icon={<IoHomeOutline />} {...props} />;

const Path = (props) => <IconMaker icon={<GiPathDistance />} {...props} />;

const Approved = (props) => <IconMaker icon={<SiShopify />} {...props} />;

const Rejected = (props) => <IconMaker icon={<ImCancelCircle />} {...props} />;

const Waiting = (props) => <IconMaker icon={<MdTimelapse />} {...props} />;

export {
    Search,
    Account,
    DropDown,
    BasketIcon,
    Hide,
    Show,
    FilledStar,
    HalfStar,
    EmptyStar,
    Favorite,
    Add,
    Edit,
    Delete,
    Plus,
    Minus,
    Arrived,
    Path,
    Approved,
    Rejected,
    Waiting,
};
