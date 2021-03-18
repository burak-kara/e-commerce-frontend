import React from 'react';

const Navigation = () => (
    <div className="navigation">
        <ul className="container h-100 bg-warning">
            <div className="row h-100 bg-danger">
                <li className="col category">
                    <span className="cat font-weight-bolder">Electronics</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Fashion</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Home</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Books</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Automotive</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Sports</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Toys & Games</span>
                </li>
                <li className="col category">
                    <span className="cat font-weight-bolder">Health</span>
                </li>
            </div>
        </ul>
    </div>
);

export default Navigation;
