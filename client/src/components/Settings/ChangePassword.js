import React from 'react';
import { Wrapper, Input, Label, Footer, ErrorMessage } from '../Forms/Forms';
import Button from '../Button';
import styles from './Settings.module.scss';
import { useChangePassword } from '../../hooks/Settings/useChangePassword';
import ErrorBox from '../ErrorBox';
import SuccessBox from '../SuccessBox';

const ChangePassword = ({
    userId
}) => {
    const {
        values,
        controlEvents,
        errors,
        isValid,
        isSubmitting,
        handleSubmit,
        touched,
        changePasswordSuccess,
        changePasswordError
    } = useChangePassword({
        userId
    });

    return (
        <Wrapper>
            <h3 className={styles.miniHeader}>Change password</h3>
            <Label>Current password:</Label>
            <Input
                type="password"
                name="currentPassword"
                controlEvents={controlEvents}
                value={values.currentPassword}
            />
            <Label>New password:</Label>
            <Input
                type="password"
                name="password"
                controlEvents={controlEvents}
                value={values.password}
            />
            {
                touched.password && errors.password && (
                    <ErrorMessage>
                        {errors.password}
                    </ErrorMessage>
                ) 
            }
            <Label>Confirm new password:</Label>
            <Input
                type="password"
                name="confirmPassword"
                controlEvents={controlEvents}
                value={values.confirmPassword}
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
                    disabled={!isValid || isSubmitting}
                    handleClick={handleSubmit}
                >
                    Change password
                </Button>
            </Footer>
            {
                changePasswordError && (
                    <ErrorBox>
                        {changePasswordError}
                    </ErrorBox>
                )
            }
            {
                changePasswordSuccess && (
                    <SuccessBox>
                        Password was changed successfully
                    </SuccessBox>
                )
            }
        </Wrapper>            
    );
};

export default ChangePassword;