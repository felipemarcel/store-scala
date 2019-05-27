import React from 'react';
import {Route, Router} from 'react-router-dom';
import App from './App';
import history from './history';

export const makeMainRoutes = () => {
    return (
        <Router history={history} component={App}>
            <div>
                <Route path="/" render={(props) => {
                    return <App {...props} />
                }}/>
            </div>
        </Router>
    );
};