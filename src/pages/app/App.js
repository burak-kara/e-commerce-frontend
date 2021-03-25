import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SessionContext, getSessionCookie } from '../../components/sessions/sessions.ts';
import Routes from './Routes';


const App = () => {
    const [session, setSession] = useState(getSessionCookie());

    useEffect(() => {
        setSession(getSessionCookie());
    }, []);

    return (
        <SessionContext.Provider value={session}>
            <Router>
                <Routes />
            </Router>
        </SessionContext.Provider>
    );
};

export default App;
