import React, {Component} from 'react';
import Loading from './Loading/loading';
import { connect } from 'react-redux';
import { logOut, clearLogs } from './../actions';

class LogOut extends Component {
    UNSAFE_componentWillMount(){
        this.props.dispatch(logOut());
    }
    componentWillUnmount(){
        this.props.dispatch(clearLogs());
    }
    render(){
        return (
            <div>
                <Loading nightmode={this.props.nightmode}/>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        user: state.user,
        logs: state.logs
    }
}
export default connect(mapStateToProps)(LogOut);