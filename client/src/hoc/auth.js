import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from './../actions';

export default function(ComposedClass, reload, nightmode) {
    class AuthenticationCheck extends Component {
        UNSAFE_componentWillMount() {
            this.props.dispatch(auth());
        }
        UNSAFE_componentWillReceiveProps(nextProps) {
            if (!nextProps.user.data.isAuth) {
                if (reload === true && typeof(data) !== String) {
                    this.props.history.push('/login');
                }
            } else if (nextProps.user.data.isAuth === true) {
                if (reload === false) {
                    this.props.history.push('/dashboard')
                }
            }
        }
        render() {
            return (
                <ComposedClass {...this.props} user={this.props.user} nightmode={nightmode}/>
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