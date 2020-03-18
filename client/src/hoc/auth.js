import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from './../actions';

export default function(ComposedClass, reload, nightmode, changemode) {
    class AuthenticationCheck extends Component {
        UNSAFE_componentWillMount() {
            console.log("Component will mount");
            this.props.dispatch(auth());
        }
        UNSAFE_componentWillReceiveProps(nextProps) {
            console.log(nextProps);
            if (!nextProps.user.data.isAuth) {
                if (reload === true) {
                    this.props.history.push('/login');
                }
            } else {
                if (reload === false) {
                    this.props.history.push('/dashboard')
                }
            }
        }
        render() {
            return (
                <ComposedClass {...this.props} user={this.props.user} nightmode={nightmode} changemode={changemode}/>
            )
        }
    }
    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)
};