import React, { Fragment } from 'react';
import { Heading, Wrapper, Label, Input, Footer, ErrorMessage } from '../Forms/Forms';
import Button from '../Button';
import BackButton from '../Back';
import ErrorBox from '../ErrorBox';
import { useRegisterForm } from '../../hooks/Register/useRegisterForm';

const Register = () => {
    const {
        values,
        controlEvents,
        errors,
        isValid,
        touched,
        isSigningUp,
        handleSubmit,
        createUserError
    } = useRegisterForm();

    return (
        <Fragment>
            <Wrapper>   
                <Heading>Sign Up</Heading>
                <form>
                    <Label>Enter your first name</Label>
                    <Input 
                        type="text" 
                        name="firstName"
                        value={values.firstName}
                        controlEvents={controlEvents}
                    />
                    {errors.firstName && touched.firstName && (
                        <ErrorMessage>
                            {errors.firstName}
                        </ErrorMessage>
                    )}

                    <Label>Enter your last name</Label>
                    <Input 
                        type="text" 
                        name="lastName"
                        value={values.lastName}
                        controlEvents={controlEvents}
                    />
                    {errors.lastName && touched.lastName && (
                        <ErrorMessage>
                            {errors.lastName}
                        </ErrorMessage>
                    )}
                    
                    <Label>Enter your email:</Label>
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

                    <Label>Confirm your password:</Label>
                    <Input 
                        type="password" 
                        name="confirmPassword"
                        value={values.confirmPassword}
                        controlEvents={controlEvents}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <ErrorMessage>
                            {errors.confirmPassword}
                        </ErrorMessage>
                    )}

                    <Footer>
                        <Button 
                            color={"primary"}
                            disabled={!isValid || isSigningUp}
                            handleClick={handleSubmit}
                        >
                            Sign up
                        </Button>
                    </Footer>
                </form>
                {  createUserError && (
                    <ErrorBox>
                        Error: {createUserError}
                    </ErrorBox>
                )}
            </Wrapper>
            <BackButton/>
        </Fragment>
    );
};

export default Register;