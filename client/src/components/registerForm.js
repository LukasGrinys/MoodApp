import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { Link } from 'react-router-dom'
import Button from './../widgets/Button';
import MessageBox from './../widgets/MessageBox';
import styles from './register.module.css';
import BackButton from './../widgets/backButton';

class RegisterForm extends Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        message: null,
        success: null,
        isDisabled: false
    }
    
    handleFName = (event) => {
        this.setState({
            fname: event.target.value,
            message: ""
        })
    }

    handleLName = (event) => {
        this.setState({
            lname: event.target.value,
            message: ""
        })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value,
            message: ""
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
            message: ""
        })
    }

    handleForm = () => {
        if (this.state.isDisabled) { return; };
        let fname = this.state.fname.trim().length > 0 ? this.state.fname.trim() : null;
        let lname = this.state.lname.trim().length > 0 ? this.state.lname.trim() : null;
        let email = this.state.email.trim().length > 0 ? this.state.email.trim() : null;
        let password = this.state.password.trim().length >= 6 ? this.state.password.trim() : null;
        const payload = {
            email : email,
            password: password,
            firstName : fname,
            lastName : lname
        };
        if (fname && lname && email && password) {
            this.setState({isDisabled: true})
            this.props.dispatch(createUser(payload));
        } else if (this.state.password.trim().length < 6) {
            this.setState({
                success: false,
                message: "The password needs to be at least 6 characters long",
                isDisabled: false
            })
        } else {
            this.setState({
                success: false,
                message: "Fill out the missing fields",
                isDisabled: false
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.success) {
            this.setState({
                fname: "",
                lname: "",
                email: "",
                password: "",
                success: true,
                message: "Your account has been succesfully created!"
            })
        } else if (nextProps.user.success === false) {
            if (nextProps.user.error.code === 11000) {
                this.setState({
                    success: false,
                    message: "User with the e-mail listed already exists",
                    isDisabled: false
                })
            } else {
                this.setState({
                    success: false,
                    message: "Error, try again later",
                    isDisabled: false
                })
            }
            
        }
    }

    renderMessage = () => {
        if (this.state.message && this.state.success) {
            return ( <MessageBox text={this.state.message} success={this.state.success}/> )
        } else if (this.state.message && !this.state.success) {
            return ( <MessageBox text={this.state.message} success={this.state.success}/> )
        } else {
            return null
        }
    }

    renderLoginButton = () => {
        if (this.state.success === true) {
            return ( <Link to="/login">
                        <Button color={"#fffff2"} background={"#3366ff"}>Log in</Button>
                    </Link> )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <div>Signing up is easy and takes only a few minutes!</div><br/>
                <form>
                    <span>Enter your first name: </span><br/>
                    <input type="text" name="fname" value={this.state.fname} onChange={this.handleFName}/><br/>
                    <span>Enter your last name: </span><br/>
                    <input type="text" name="lname"  value={this.state.lname} onChange={this.handleLName}/><br/>
                    <span>Enter your e-mail:</span><br/>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleEmail}/><br/>
                    <span>Enter your password:</span><br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handlePassword}/><br/><br/>
                    {this.renderMessage()}
                    <div className={styles.center_line}>
                        <div onClick={this.handleForm}>
                            <Button color={"#fffff2"} disabled={this.state.isDisabled} background={"#3366ff"}>
                                Sign Me Up!
                            </Button>
                            {this.renderLoginButton()}
                        </div>
                    </div><br/>
                </form>
                <BackButton/>
            </div>
        );
    }
}

function mapStateToProps(state){  
    return {
        user: state.user
    }
} 

export default connect(mapStateToProps)(RegisterForm);