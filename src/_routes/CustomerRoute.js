import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';
import { SIGN_IN, UNAUTH } from '../_constants';

const CustomerRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useStore().getState();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user || !user.first_name) {
                    return <Redirect to={{ pathname: SIGN_IN, state: { from: props.location } }} />;
                }

                // role check
                if (!user.is_sales_manager && !user.is_product_manager) {
                    return <Redirect to={{ pathname: UNAUTH }} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default CustomerRoute;
