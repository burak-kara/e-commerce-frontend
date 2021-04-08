import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../_requests';

const Navigation = () => {
    const history = useHistory();
    const [categories, setCategories] = useState([]);

    const handleCategory = (pathname) => {
        history.push({
            pathname: `/${pathname}`,
        });
    };

    useEffect(() => {
        getCategories()
            .then((response) => {
                const cats = [];
                if (response.data) {
                    response.data.forEach((item) => {
                        let { name } = item;
                        const cat_name = name;
                        name = name.toLowerCase().replaceAll(' ', '-');
                        cats.push(
                            <li className="col category" key={name}>
                                <span
                                    className="cat font-weight-bolder"
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => handleCategory(name)}
                                    onKeyDown={() => handleCategory(name)}
                                >
                                    {cat_name}
                                </span>
                            </li>,
                        );
                    });
                    setCategories(cats);
                }
            })
            .catch(() => {
                // TODO handle error
            });
    }, []);

    return (
        <div className="navigation">
            <ul className="container h-100">
                <div className="row h-100">{categories || null}</div>
            </ul>
        </div>
    );
};

export default Navigation;
