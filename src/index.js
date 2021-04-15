import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './_styles/main.scss';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './pages/app/App';
import store from './_redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
