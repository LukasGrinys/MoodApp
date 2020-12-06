import React, {Component} from 'react';
import Loading from '../Loading/loading';
import { connect } from 'react-redux';
import { logOut } from '../../actions/user/asyncActions';

class LogOut extends Component {
    UNSAFE_componentWillMount(){
        this.props.dispatch(logOut());
    }

    render(){
        return <Loading/>
    }
};

export default connect(null)(LogOut);