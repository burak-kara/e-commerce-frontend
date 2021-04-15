import React from 'react';
import { useHistory } from 'react-router-dom';
import { logo } from '../../_assets';
import { LANDING } from '../../_constants';

const NotFound = () => {
    const history = useHistory();

    return (
        <div className="container-fluid common-page">
            <div className="row">
                <div className="col-12 image-container">
                    <img className="image" src={logo} alt="401" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 info-container">
                    <p className="text-center">OPPS! Page not found</p>
                </div>
                <div className="col-12 btn-container">
                    <button
                        className="btn font-weight-bold"
                        type="button"
                        onClick={() =>
                            history.push({
                                pathname: LANDING,
                            })
                        }
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
