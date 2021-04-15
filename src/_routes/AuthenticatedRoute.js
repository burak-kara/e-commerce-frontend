import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';
import { UN_AUTHENTICATED } from '../_constants';

const AuthenticatedRoute = ({ component: Component, roles, ...rest }) => {
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

                return <Component {...props} />;
            }}
        />
    );
};

export default AuthenticatedRoute;
