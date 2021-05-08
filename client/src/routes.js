import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerRoutes } from './constants/routerRoutes';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddLogPage from './components/AddLog';
import AllLogs from './components/Logs';
import LogView from './components/ViewLog';
import LogOut from './components/LogOut';
import Settings from './components/Settings';
import Stats from './components/stats';
import DeleteAccount from './components/DeleteAccount';
import Header from './components/Header';

import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Fragment>
            <Header/>
            <div className="content_wrapper">
                <Switch>
                    <Route path={routerRoutes.home} exact component={Auth(Home, null)}></Route>
                    <Route path={routerRoutes.login} exact component={Auth(Login, false)}></Route>
                    <Route path={routerRoutes.register} exact component={Auth(Register, null)}></Route>
                    <Route path={routerRoutes.dashboard} exact component={Auth(Dashboard, true)}></Route>
                    <Route path={routerRoutes.addNewLog} exact component={Auth(AddLogPage,true)}></Route>
                    <Route path={routerRoutes.allLogs} exact component={Auth(AllLogs, true)}></Route>
                    <Route path={routerRoutes.viewLog} exact component={Auth(LogView, true)}></Route>
                    <Route path={routerRoutes.logout} exact component={Auth(LogOut, true)}></Route>
                    <Route path={routerRoutes.settings} exact component={Auth(Settings, true)}></Route>
                    <Route path={routerRoutes.delete} exact component={Auth(DeleteAccount, true)}></Route>
                    <Route path={routerRoutes.stats} exact component={Auth(Stats, true)}></Route>
                </Switch>
            </div>
        </Fragment>
    )
}

export default Routes;