import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Navigation } from '../../components';
import { Dummy } from '../index';

const App = () => (
    <Router>
        <div className="sticky-top">
            <Header />
        </div>
        <Navigation />
        <Switch>
            <Route exact path="/test" component={Dummy} />
        </Switch>
    </Router>
);

export default App;
