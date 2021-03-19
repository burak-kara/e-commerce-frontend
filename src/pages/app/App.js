import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import { Dummy } from '../index';
import { LANDING, BASKET } from '../../_constants';

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
        </Switch>
    </Router>
);

export default App;
