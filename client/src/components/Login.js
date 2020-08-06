import React from 'react';
import FormWrapper from './../widgets/FormWrapper';
import LoginForm from './loginForm';
import { useTheme } from './../hoc/ThemeContext';

const Login = () => {
    const darkTheme = useTheme();
    return (
        <FormWrapper>
            <LoginForm nightmode={darkTheme}/>
        </FormWrapper>
    );
};

export default Login;