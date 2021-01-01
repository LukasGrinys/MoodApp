import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from './../actions/user/asyncActions';
import Loading from '../components/Loading/loading';

export default function(ComposedClass, redirect) {
    class AuthenticationCheck extends Component {
        UNSAFE_componentWillMount() {
            this.props.dispatch(auth());
        }

        UNSAFE_componentWillReceiveProps({user}) {
            if (!user || !user.isAuth) {
                if (redirect) {
                    this.props.history.push('/login');
                }
            } else if (user.isAuth) {
                if (redirect === false) {
                    this.props.history.push('/dashboard')
                }
            }
        }

        render() {
            const { user } = this.props;

            if (!user || (user.isAuth === null && window.location.pathname !== '/login' ) ) {
                return <Loading/>
            }

            return (
                <ComposedClass 
                    {...this.props} 
                    user={this.props.user}
                />
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