import React from 'react';
import FormWrapper from './../widgets/FormWrapper';
import RegisterForm from './registerForm';
const Register = (props) => {
    let nightmode = props.nightmode;
    return (
        <div>
            <FormWrapper>
                <RegisterForm nightmode={nightmode}/>
            </FormWrapper>
        </div>
    );
};

export default Register;