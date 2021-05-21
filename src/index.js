import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './_styles/main.scss';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './pages/app/App';
import { store, persistor } from './_redux/store';
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './_firebase';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <FirebaseContext.Provider value={new Firebase()}>
                    <App />
                </FirebaseContext.Provider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
