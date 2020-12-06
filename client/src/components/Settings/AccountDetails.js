import React from 'react';
import { Wrapper, Input, Label, Footer, ErrorMessage } from '../Forms/Forms';
import Button from '../Button';
import ErrorBox from '../ErrorBox';
import SuccessBox from '../SuccessBox';
import styles from './Settings.module.scss';
import { useEditAccount } from '../../hooks/Settings/useEditAccount';

const AccountDetails = ({
    email,
    firstName,
    lastName
}) => {
    const {
        isSubmitting,
        isEditingUser,
        editUserError,
        editUserSuccess,
        values,
        errors,
        touched,
        isValid,
        handleSubmit,
        controlEvents
    } = useEditAccount({
        firstName,
        lastName
    })

    return (
        <Wrapper>
            <div><strong>User: </strong> {email}</div><br/>
            <h3 className={styles.miniHeader}>Edit details:</h3>
            <Label>First name:</Label>
            <Input
                name="firstName"
                value={values.firstName}
                controlEvents={controlEvents}
            />
            {
                (errors.firstName && touched.firstName) && (
                    <ErrorMessage>
                        {errors.firstName}
                    </ErrorMessage>
                )
            }
            <Label>Last name:</Label>
            <Input
                name="lastName"
                value={values.lastName}
                controlEvents={controlEvents}    
            />
            {
                (errors.lastName && touched.lastName) && (
                    <ErrorMessage>
                        {errors.lastName}
                    </ErrorMessage>
                )
            }
            <Footer>
                <Button
                    disabled={isSubmitting || !isValid || isEditingUser}
                    handleClick={handleSubmit}
                >
                    Save changes
                </Button>
            </Footer>
            {
                !isEditingUser && editUserError && (
                    <ErrorBox>
                        {editUserError}
                    </ErrorBox>
                )
            }
            {
                !isEditingUser && editUserSuccess && (
                    <SuccessBox>
                        Account information was saved
                    </SuccessBox>
                )
            }
        </Wrapper>
    );
};

export default AccountDetails;