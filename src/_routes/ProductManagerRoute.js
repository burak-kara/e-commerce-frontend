import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';
import { UN_AUTHENTICATED, UN_AUTHORIZED } from '../_constants';

const ProductManagerRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useStore().getState();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user || !user.first_name) {
                    return (
                        <Redirect
                            to={{ pathname: UN_AUTHENTICATED, state: { from: props.location } }}
                        />
                    );
                }

                // role check
                if (!user.is_product_manager) {
                    return <Redirect to={{ pathname: UN_AUTHORIZED }} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default ProductManagerRoute;
