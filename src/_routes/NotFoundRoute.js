import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { NOT_FOUND } from '../_constants';

const NotFoundRoute = () => <Route render={() => <Redirect to={{ pathname: NOT_FOUND }} />} />;

export default NotFoundRoute;
