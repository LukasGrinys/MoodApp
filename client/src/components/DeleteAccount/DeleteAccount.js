import React, { Fragment } from 'react';
import BackButton from '../Back/BackButton';
import { Wrapper, Heading, Label, Input, Footer, ErrorMessage } from '../Forms/Forms';
import ErrorBox from '../ErrorBox/ErrorBox';
import Button from '../Button/Button';
import { useDeleteAccount } from '../../hooks/DeleteAccount/useDeleteAccount';

const DeleteAccount = () => {
    const {
        values,
        errors,
        isValid,
        controlEvents,
        touched,
        handleSubmit,
        isDeleting,
        error
    } = useDeleteAccount();

    return (
        <Fragment>
            <BackButton/>
            <Wrapper>
                <ErrorBox>
                    <strong>Warning: </strong> deleting your account will 
                    permanently delete all your data, including all logs
                    stored in the database.
                </ErrorBox><br/>
                <Heading>Delete account:</Heading>
                <Label>Enter your passsword:</Label>
                <Input
                    name="password"
                    value={values.password}
                    type="password"
                    controlEvents={controlEvents}
                />
                {
                    touched.password && errors.password && (
                        <ErrorMessage>
                            {errors.password}
                        </ErrorMessage>
                    )
                }
                <Label>Confirm your password:</Label>
                <Input
                    name="confirmPassword"
                    value={values.confirmPassword}
                    type="password"
                    controlEvents={controlEvents}
                />
                {
                    touched.confirmPassword && errors.confirmPassword && (
                        <ErrorMessage>
                            {errors.confirmPassword}
                        </ErrorMessage>
                    )
                }
                <Footer>
                    <Button
                        disabled={!isValid || isDeleting}
                        handleClick={handleSubmit}
                    >
                        Delete account
                    </Button>
                </Footer>
                {
                    error && !isDeleting && (
                        <ErrorBox>
                            {error}
                        </ErrorBox>
                    ) 
                }
            </Wrapper>
        </Fragment>
    )
}

export default DeleteAccount