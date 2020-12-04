import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerRoutes } from './constants/routerRoutes';

// Components
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AddLogPage from './components/AddLog/AddLogPage';
import AllLogs from './components/Logs/AllLogs';
import LogView from './components/ViewLog/LogView';
import LogOut from './components/LogOut';
import Settings from './components/Settings/Settings';
import Stats from './components/Stats/Stats';
import DeleteAccount from './components/DeleteAccount/DeleteAccount';
import Header from './components/Header/Header';

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