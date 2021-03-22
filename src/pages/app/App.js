import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import { Dummy, Orders, Profile, Settings, Signup } from '../index';
import { LANDING, BASKET, PROFILE, SETTINGS, ORDERS, SIGN_UP, SIGN_IN } from '../../_constants';

const App = () => (
    <Router>
        <div className="sticky-top">
            <Header />
        </div>
        <Navigation />
        <Switch>
            <Route exact path="/test" component={Dummy} />

            <Route exact path={LANDING} />

            <Route exact path={BASKET} component={Dummy} />

            <Route exact path={PROFILE} component={Profile} />
            <Route exact path={SETTINGS} component={Settings} />
            <Route exact path={ORDERS} component={Orders} />

            <Route exact path={SIGN_UP} component={Signup} />
            <Route exact path={SIGN_IN} component={Signup} />
        </Switch>
    </Router>
);

export default App;
