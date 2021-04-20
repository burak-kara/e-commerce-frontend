import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { openAlert } from '../_redux/actions';
import {
    CAT_ELECTRONICS,
    CAT_CONSUMABLES,
    CAT_FASHION,
    CAT_LIFE,
    CAT_HOBBY,
    CAT_TOYS,
    CAT_COSMETICS,
    CAT_OTHERS,
} from '../_constants';

const Navigation = () => {
    const history = useHistory();

    const handleCategory = (pathname) => {
        history.push({
            pathname: `${pathname}`,
        });
    };

    const getName = (name) => name.toLowerCase().replaceAll('/', '').replaceAll('-', ' ');

    return (
        <div className="navigation">
            <ul className="container h-100">
                <div className="row h-100">
                    <li className="col category" key={CAT_ELECTRONICS}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_ELECTRONICS)}
                            onKeyDown={() => handleCategory(CAT_ELECTRONICS)}
                        >
                            {getName(CAT_ELECTRONICS)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_CONSUMABLES}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_CONSUMABLES)}
                            onKeyDown={() => handleCategory(CAT_CONSUMABLES)}
                        >
                            {getName(CAT_CONSUMABLES)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_FASHION}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_FASHION)}
                            onKeyDown={() => handleCategory(CAT_FASHION)}
                        >
                            {getName(CAT_FASHION)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_LIFE}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_LIFE)}
                            onKeyDown={() => handleCategory(CAT_LIFE)}
                        >
                            {getName(CAT_LIFE)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_HOBBY}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_HOBBY)}
                            onKeyDown={() => handleCategory(CAT_HOBBY)}
                        >
                            {getName(CAT_HOBBY)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_TOYS}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_TOYS)}
                            onKeyDown={() => handleCategory(CAT_TOYS)}
                        >
                            {getName(CAT_TOYS)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_COSMETICS}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_COSMETICS)}
                            onKeyDown={() => handleCategory(CAT_COSMETICS)}
                        >
                            {getName(CAT_COSMETICS)}
                        </span>
                    </li>
                    <li className="col category" key={CAT_OTHERS}>
                        <span
                            className="cat font-weight-bolder"
                            role="button"
                            tabIndex="0"
                            onClick={() => handleCategory(CAT_OTHERS)}
                            onKeyDown={() => handleCategory(CAT_OTHERS)}
                        >
                            {getName(CAT_OTHERS)}
                        </span>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default connect(null, { openAlert })(Navigation);
