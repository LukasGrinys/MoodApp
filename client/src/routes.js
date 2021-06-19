import React, { Fragment, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerRoutes } from './constants/routerRoutes';

// Components
import Header from './components/Header';
import Loading from './components/Loading/loading';

import Auth from './hoc/auth';

const Home = React.lazy(() => import('./components/Home'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const AddLogPage = React.lazy(() => import('./components/AddLog'));
const AllLogs = React.lazy(() => import('./components/Logs'));
const LogView = React.lazy(() => import('./components/ViewLog'));
const LogOut = React.lazy(() => import('./components/LogOut'));
const Settings = React.lazy(() => import('./components/Settings'));
const Stats = React.lazy(() => import('./components/stats'));
const DeleteAccount = React.lazy(() => import('./components/DeleteAccount'));

const Routes = () => {
    useEffect(() => {
        document.getElementById('loadingWindow').remove();
    }, []);

    return (
        <Fragment>
            <Header/>
            <div className="content_wrapper">
                <Switch>
                    <Suspense fallback={<Loading/>}>
                        <Route path={routerRoutes.home} exact component={Home}></Route>
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
                    </Suspense>
                </Switch>
            </div>
        </Fragment>
    )
}

export default Routes;