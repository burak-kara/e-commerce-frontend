import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { Alert } from '../../components';

const App = () => (
    <>
        <Router>
            <Routes />
        </Router>
        <Alert />
    </>
);

export default App;
