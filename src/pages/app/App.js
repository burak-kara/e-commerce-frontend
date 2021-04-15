import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Alert } from '../../components';
import Routes from '../../_routes';

const App = () => (
    <>
        <Router>
            <Routes />
        </Router>
        <Alert />
    </>
);

export default App;
