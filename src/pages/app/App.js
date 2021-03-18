import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Navigation } from '../../components';

const App = () => (
    <Router>
        <Header />
        <Navigation id="testid">test</Navigation>
    </Router>
);

export default App;
