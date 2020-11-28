import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FormWrapper from './../widgets/FormWrapper';
import Loading from './Loading/loading';
import ButtonWid from './../widgets/Button';
import MessageBox from './../widgets/MessageBox';
import BackButton from './../widgets/backButton';

import styles from './settings.module.css';

import { deleteUser } from './../actions';


class DeleteAccount extends Component {
    state = {
        password: '',
        password_confirm: '',
        isDisabled: false,
        error: null,
        errorMsg : ''
    }

    handlePassword = (event) => {
        let password = event.target.value;
        this.setState({password, error: null})
    }
    handlePasswordConfirm = (event) => {
        let password_confirm = event.target.value;
        this.setState({password_confirm, error : null})
    }

    renderErrorMessage = () => {
        if (this.state.error === true) {
            return <MessageBox success={!this.state.error} text={this.state.errorMsg}/>
        } else {
            return null
        }
    }

    handleDeleteAccount = () => {
        // Empty fields
        if (this.state.password.trim().length === 0 || this.state.password_confirm.trim().length === 0) {
            this.setState({
                error: true,
                errorMsg : "Fields cannot be empty"
            });
            return;
        }
        // Passwords do not match
        if (this.state.password.trim() !== this.state.password_confirm.trim()) {
            this.setState({
                error: true,
                errorMsg : "Passwords do not match"
            });
            return;
        }
        // 
        this.setState({isDisabled : true});
        let password = this.state.password.trim();
        let userId = this.props.user.data.id;
        const body = {
            password,
            userId
        }
        axios.post(`/api/deleteAccount`, body)
        .then( (response) => {
            if (response.data.error === true) {
                this.setState({
                    error: true,
                    errorMsg : response.data.message,
                    isDisabled : false
                })
            } else {
                this.props.dispatch(deleteUser());
                this.props.history.push('/');
            }
        })
    }

    saveNewPassword = () => {
        if (this.state.isDisabled) return;
        const oldpassword = this.state.currentPassword;
        const newpassword = this.state.newPassword;
        const _id = this.props.user.data.id;
        const body = {
            _id, oldpassword, newpassword
        };
        if (newpassword.trim().length < 6) {
            this.setState({
                passwordChanged: false,
                passwordChangedMessage: "The password is too short. You must pick a password longer than 6 characters"
            })
            return;
        } else {
            this.setState({isDisabled: true})
            axios.post('/api/changePassword', body)
            .then( ({data}) => {
                if (data.error === true) {
                    this.setState({
                        passwordChanged: false,
                        passwordChangedMessage: data.message,
                        isDisabled: false
                    })
                };
                if (data.error === false) {
                    this.setState({
                        passwordChanged: true,
                        passwordChangedMessage: data.message,
                        currentPassword: '',
                        newPassword: '',
                        isDisabled: false
                    });
                }
                if (!data) {
                    this.setState({
                        passwordChanged: false,
                        passwordChangedMessage: "An error occured. Try again later",
                        isDisabled: false
                    })
                }
            })
        }
    }

    render() {
        if (this.props.user) {
            return (
                <div>
                    <BackButton/>
                    <FormWrapper>
                        <h2>Delete account:</h2>
                        <label htmlFor="password">Enter your password:</label>
                        <input type="password" onChange={this.handlePassword}></input>
                        <label htmlFor="password_confirm">Confirm your password:</label>
                        <input type="password" onChange={this.handlePasswordConfirm}></input>
                        {this.renderErrorMessage()}
                        <div className={styles.center}>
                            <div onClick={this.handleDeleteAccount}>
                                <ButtonWid background="#3366FF" color="#FFFFFF" disabled={this.state.isDisabled}>
                                    Delete account
                                </ButtonWid>
                            </div>
                        </div>
                    </FormWrapper>
                </div>
            )
        } else {
            return <Loading/>
        }
    }
}

function mapStateToProps(state) {
    return {
        logs: state.logs
    }
}

export default connect(mapStateToProps)(DeleteAccount);