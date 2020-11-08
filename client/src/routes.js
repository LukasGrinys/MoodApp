import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Layout from './hoc/layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddLog from './components/AddLog';
import AllLogs from './components/AllLogs';
import LogView from './components/LogView';
import LogOut from './components/LogOut';
import Settings from './components/Settings';
import Stats from './components/Stats/Stats';
import DeleteAccount from './components/DeleteAccount';

import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)}></Route>
                <Route path="/login" exact component={Auth(Login, false)}></Route>
                <Route path="/register" exact component={Auth(Register, null)}></Route>
                <Route path="/dashboard" exact component={Auth(Dashboard, true)}></Route>
                <Route path="/addlog" exact component={Auth(AddLog,true)}></Route>
                <Route path="/logs" exact component={Auth(AllLogs, true)}></Route>
                <Route path="/logs/:id" exact component={Auth(LogView, true)}></Route>
                <Route path="/logout" exact component={Auth(LogOut, true)}></Route>
                <Route path="/settings" exact component={Auth(Settings, true)}></Route>
                <Route path="/delete" exact component={Auth(DeleteAccount, true)}></Route>
                <Route path="/stats" exact component={Auth(Stats, true)}></Route>
            </Switch>
        </Layout>
    )
}

export default Routes;