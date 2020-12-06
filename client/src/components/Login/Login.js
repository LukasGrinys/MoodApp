import React from 'react';
import Button from '../Button/Button';
import { Heading, Wrapper, Label, Input, Footer, ErrorMessage } from '../Forms/Forms';
import ErrorBox from '../ErrorBox';
import { useLoginForm } from '../../hooks/Login/useLoginForm';

const Login = () => {
    const {
        values,
        errors,
        isValid,
        controlEvents,
        touched,
        isLoggingIn,
        handleSubmit,
        loginError
    } = useLoginForm();

    return (
        <Wrapper>
            <Heading>Log In</Heading>
            <form>
                <Label>Enter your email: </Label>
                <Input 
                    type="email" 
                    name="email"
                    value={values.email}
                    controlEvents={controlEvents}
                />
                {errors.email && touched.email && (
                    <ErrorMessage>
                        {errors.email}
                    </ErrorMessage>
                )}
                <Label>Enter your password:</Label>
                <Input 
                    type="password" 
                    name="password"
                    value={values.password}
                    controlEvents={controlEvents}
                />
                {errors.password && touched.password && (
                    <ErrorMessage>
                        {errors.password}
                    </ErrorMessage>
                )}
                <Footer>
                    <Button 
                        color={"primary"}
                        disabled={!isValid || isLoggingIn}
                        handleClick={handleSubmit}
                    >
                        Log In
                    </Button>
                </Footer>
            </form>
            {  loginError && (
                <ErrorBox>
                    Error: {loginError}
                </ErrorBox>
            )}
        </Wrapper>
            
    );
};

export default Login;