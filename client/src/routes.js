import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Layout from './hoc/layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AllLogs from './components/AllLogs';
import LogView from './components/LogView';

import Auth from './hoc/auth';

const checkNightMode = () => {
    if (!localStorage.nightMode) {
        localStorage.nightMode = false;
    } else {
        return localStorage.nightMode
    }
}

const Routes = () => {
    const nightmode = checkNightMode();
    return (
        <Layout nightmode={nightmode}>
            <Switch>
                <Route path="/" exact component={Auth(Home, null, nightmode)}></Route>
                <Route path="/login" exact component={Auth(Login, false, nightmode)}></Route>
                <Route path="/register" exact component={Auth(Register, null, nightmode)}></Route>
                <Route path="/dashboard" exact component={Auth(Dashboard, true, nightmode)}></Route>
                <Route path="/logs" exact component={Auth(AllLogs, true, nightmode)}></Route>
                <Route path="/logs/:id" exact component={Auth(LogView, true, nightmode)}></Route>
            </Switch>
        </Layout>
    )
}

export default Routes;