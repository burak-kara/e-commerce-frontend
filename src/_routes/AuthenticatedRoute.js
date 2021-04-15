import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';
import { SIGN_IN } from '../_constants';

const AuthenticatedRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useStore().getState();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user || !user.first_name) {
                    return <Redirect to={{ pathname: SIGN_IN, state: { from: props.location } }} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default AuthenticatedRoute;
