import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AddLogPage from './components/AddLog/AddLogPage';
import AllLogs from './components/AllLogs';
import LogView from './components/LogView';
import LogOut from './components/LogOut';
import Settings from './components/Settings';
import Stats from './components/Stats/Stats';
import DeleteAccount from './components/DeleteAccount';
import Header from './components/Header/Header';

import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Fragment>
            <Header/>
            <div className="content_wrapper">
                <Switch>
                    <Route path="/" exact component={Auth(Home, null)}></Route>
                    <Route path="/login" exact component={Auth(Login, false)}></Route>
                    <Route path="/register" exact component={Auth(Register, null)}></Route>
                    <Route path="/dashboard" exact component={Auth(Dashboard, true)}></Route>
                    <Route path="/addlog" exact component={Auth(AddLogPage,true)}></Route>
                    <Route path="/logs" exact component={Auth(AllLogs, true)}></Route>
                    <Route path="/logs/:id" exact component={Auth(LogView, true)}></Route>
                    <Route path="/logout" exact component={Auth(LogOut, true)}></Route>
                    <Route path="/settings" exact component={Auth(Settings, true)}></Route>
                    <Route path="/delete" exact component={Auth(DeleteAccount, true)}></Route>
                    <Route path="/stats" exact component={Auth(Stats, true)}></Route>
                </Switch>
            </div>
        </Fragment>
    )
}

export default Routes;