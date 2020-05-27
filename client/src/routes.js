import React, { Component } from 'react';
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
import Stats from './components/stats/Stats';

import Auth from './hoc/auth';

class Routes extends Component {
    state = {
        nightmode: "false"
    }
    UNSAFE_componentWillMount(){
        if (!localStorage.nightmode) {
            localStorage.nightmode = "false";
        };
        if (localStorage.nightmode === "true") {
            this.setState({nightmode: "true"});
            document.body.style.background = "rgb(51, 51, 51)";
            document.body.style.color = "rgb(242,242,242";
        }
    }
    changeMode = () => {
        if (this.state.nightmode === "true") { 
            this.setState( {nightmode : "false"} );
            document.body.style.background = "#FFFFFF";
            document.body.style.color = "#000000";
            localStorage.nightmode = "false";
        } else if (this.state.nightmode === "false") { 
            this.setState( {nightmode : "true"});
            document.body.style.background = "rgb(51, 51, 51)";
            document.body.style.color = "rgb(242,242,242";
            localStorage.nightmode = "true";
        };
    }
    render(){
        let nightmode = this.state.nightmode;
        return (
            <Layout nightmode={nightmode} changemode={ () => {this.changeMode()}}>
                <Switch>
                    <Route path="/" exact component={Auth(Home, null, nightmode)}></Route>
                    <Route path="/login" exact component={Auth(Login, false, nightmode)}></Route>
                    <Route path="/register" exact component={Auth(Register, null, nightmode)}></Route>
                    <Route path="/dashboard" exact component={Auth(Dashboard, true, nightmode)}></Route>
                    <Route path="/addlog" exact component={Auth(AddLog,true, nightmode)}></Route>
                    <Route path="/logs" exact component={Auth(AllLogs, true, nightmode)}></Route>
                    <Route path="/logs/:id" exact component={Auth(LogView, true, nightmode)}></Route>
                    <Route path="/logout" exact component={Auth(LogOut, true, nightmode)}></Route>
                    <Route path="/settings" exact component={Auth(Settings, true, nightmode)}></Route>
                    <Route path="/stats" exact component={Auth(Stats, true, nightmode)}></Route>
                </Switch>
            </Layout>
        )
    }  
}

export default Routes;