import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';
import { LANDING } from '../_constants';

const UnAuthenticatedRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useStore().getState();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (user && user.first_name) {
                    return <Redirect to={{ pathname: LANDING }} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default UnAuthenticatedRoute;
