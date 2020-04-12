import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../actions';

import Button from './../widgets/Button';
import MessageBox from './../widgets/MessageBox';

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        success: false,
        message: ''
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
        let payload = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(loginUser(payload));
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.data.isAuth) {
            this.setState({
                message: "Logged in successfully!",
                success: true
            });
        } else {
            this.setState({
                message: nextProps.user.data.message,
                success: false
            })
        }
    }

    renderMessage = () => {
        if (this.state.success) {
            return ( <MessageBox nightmode={this.props.nightmode} text={this.state.message} success={true}/> )
        } else if (!this.state.success) {
            return ( <MessageBox nightmode={this.props.nightmode} text={this.state.message} success={false}/> )
        } else {
            return null
        }
    }
    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form>
                    <span>Enter your email: </span><br/>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleEmail}/><br/>
                    <span>Enter your password:</span><br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handlePassword}/><br/><br/>
                    {this.renderMessage()}
                    <div style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <div onClick={this.handleForm}>
                            <Button color={"#fffff2"} background={"#3366ff"} nightmode={this.props.nightmode}>
                                Log In
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){  
    return {
        user: state.user
    }
} 

export default connect(mapStateToProps)(LoginForm);