import React, { Component } from 'react';
import axios from 'axios';

import FormWrapper from './../widgets/FormWrapper';
import Loading from './../widgets/loading';
import ButtonWid from './../widgets/Button';
import MessageBox from './../widgets/MessageBox';
import BackButton from './../widgets/backButton';

import styles from './settings.module.css';


class Settings extends Component {
    state = {
        dataReceived: false,
        firstName: '',
        lastName: '',
        nightmode: null,
        currentPassword: '',
        newPassword: '',
        dataSuccess: null,
        dataSuccessMessage: '',
        passwordChanged: null,
        passwordChangedMessage: ''   
    }
    UNSAFE_componentWillMount(){
        if (this.props.nightmode === "false") {
            this.setState({ nightmode: false });
        } else if (this.props.nightmode === "true") {
            this.setState({ nightmode: true})
        }
        if (this.props.user && !this.state.dataReceived) {
            if (this.props.user.data) {
                const id = this.props.user.data.id;
                axios.get(`/api/getUser?id=${id}`)
                .then( ({data}) => {
                    const firstName = data.doc.firstName;
                    const lastName = data.doc.lastName;
                    this.setState({
                        dataReceived: true,
                        firstName,
                        lastName
                    });
                });
            }
        }
    }

    handleFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({firstName, dataSuccess : null})
    }
    handleLastName = (event) => {
        let lastName = event.target.value;
        this.setState({lastName, dataSuccess : null})
    }
    handleCurrentPassword = (event) => {
        let currentPassword = event.target.value;
        this.setState({currentPassword, passwordChanged : null})
    }
    handleNewPassword = (event) => {
        let newPassword = event.target.value;
        this.setState({newPassword, passwordChanged : null})
    }

    handleSwitch = (event) => {
        this.props.changemode();
        if (event.target.checked === true) {
            this.setState({ nightmode: true });
            localStorage.nightmode = true;
        } else if (event.target.checked === false) {
            this.setState({ nightmode: false});
            localStorage.nightmode = false;
        }
    }
    saveChanges = () => {
        const body = {
            _id : this.props.user.data.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };
        axios.post('/api/editAccount/', body)
        .then( ({data}) => {
            if (data.success) {
                this.setState({
                    dataSuccess: true,
                    dataSuccessMessage: 'Data changed successfully'
                })
            } else {
                this.setState({
                    dataSuccess: false,
                    dataSuccessMessage: 'Something went wrong, try again later'
                })
            }
        })
    }

    renderDataChangedMessage = () => {
        if (this.state.dataSuccess !== null) {
            return <MessageBox success={this.state.dataSuccess} text={this.state.dataSuccessMessage} nightmode={this.props.nightmode}/>
        } else {
            return null
        }
    }

    renderPasswordChangedMessage = () => {
        if (this.state.passwordChanged !== null) {
            return <MessageBox success={this.state.passwordChanged} text={this.state.passwordChangedMessage} nightmode={this.props.nightmode}/>
        } else {
            return null
        }
    }

    saveNewPassword = () => {
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
            axios.post('/api/changePassword', body)
            .then( ({data}) => {
                if (data.error === true) {
                    this.setState({
                        passwordChanged: false,
                        passwordChangedMessage: data.message
                    })
                };
                if (data.error === false) {
                    this.setState({
                        passwordChanged: true,
                        passwordChangedMessage: data.message,
                        currentPassword: '',
                        newPassword: ''
                    });
                }
                if (!data) {
                    this.setState({
                        passwordChanged: false,
                        passwordChangedMessage: "An error occured. Try again later"
                    })
                }
            })
        }
    }

    render() {
        if (this.props.user && this.state.dataReceived) {
            return (
                <div>
                    <BackButton nightmode={this.props.nightmode}/>
                    <FormWrapper>
                        <h1>Account settings</h1><br/>
                        <span><b>User: </b> {this.props.user.data.email} </span><br/>
                        <h2>Edit details:</h2>
                        <label htmlFor="firstName">Your first name:</label>
                        <input type="text" name="firstName" onChange={this.handleFirstName} value={this.state.firstName}/>
                        <label htmlFor="lastName">Your last name:</label>
                        <input type="text" name="lastName"  onChange={this.handleLastName} value={this.state.lastName}/>
                        {this.renderDataChangedMessage()}
                        <div className={styles.center}>
                            <div onClick={this.saveChanges}>
                                <ButtonWid background="#3366FF" color="#FFFFFF" nightmode={this.props.nightmode}>Save changes</ButtonWid>
                            </div>
                            
                        </div>
                    </FormWrapper><br/>
                    <FormWrapper>
                        <h2>Edit password:</h2>
                        <label htmlFor="password1">Enter your current password:</label>
                        <input type="password" onChange={this.handleCurrentPassword}></input>
                        <label htmlFor="password2">Enter your new password:</label>
                        <input type="password" onChange={this.handleNewPassword}></input>
                        {this.renderPasswordChangedMessage()}
                        <div className={styles.center}>
                            <div onClick={this.saveNewPassword}>
                                <ButtonWid background="#3366FF" color="#FFFFFF" nightmode={this.props.nightmode}>Change password</ButtonWid>
                            </div>
                        </div>
                    </FormWrapper>
                    <FormWrapper>
                        <div className={styles.center}>
                            <label htmlFor="nightmode">Nightmode:</label>
                            <input type="checkbox" name="nightmode" checked={this.state.nightmode} onChange={this.handleSwitch}/>
                        </div>
                    </FormWrapper>
                </div>
            )
        } else {
            return <Loading nightmode={this.props.nightmode}/>
        }
    }
}

export default Settings;