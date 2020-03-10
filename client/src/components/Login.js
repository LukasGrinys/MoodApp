import React from 'react';
import FormWrapper from './../widgets/FormWrapper';
import LoginForm from './loginForm';

const Login = (props) => {
    let nightmode = props.nightmode;
    return (
        <FormWrapper>
            <LoginForm nightmode={nightmode}/>
        </FormWrapper>
    );
};

export default Login;