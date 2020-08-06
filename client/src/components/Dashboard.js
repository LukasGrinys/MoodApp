import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardNet from './DashboardNet';
import AddNewLog from './../widgets/addNewLog';
import Loading from './../widgets/loading';
import { useTheme } from './../hoc/ThemeContext';


const UserBoard = (props) => {
    const darkTheme = useTheme();
    return (
        <div>
            <div>
                <AddNewLog userId={props.userId} nightmode={darkTheme}></AddNewLog>
            </div>
            <DashboardNet user={props.userId} nightmode={darkTheme}/>
        </div>
    )
};

class Dashboard extends Component {
    state = {
        userLogged : false
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.data.isAuth) {
            this.setState({
                userLogged : true,
                userId: nextProps.user.data.id
            })
        };
    }
    render() {
        if (this.state.userLogged) {
            const userId = this.state.userId;
            return (
                <UserBoard nightmode={this.props.nightmode}
                userId={userId}
                />
            )
        }
        return (
            <Loading/>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Dashboard);