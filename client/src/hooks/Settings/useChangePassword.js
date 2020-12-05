import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { formErrorMessages } from '../../constants/formErrorMessages';
import { initialFormValues } from '../../constants/initialFormValues';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword, clearChangePassword } from '../../actions';

export const useChangePassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const { 
        changePasswordSuccess, 
        changePasswordError,
        id : userId
    } = useSelector( ({user}) => user);

    useEffect( () => {
        return () => {
            dispatch(clearChangePassword());
        }
        // eslint-disable-next-line
    }, [])

    const validationSchema = yup.object({
        currentPassword: yup.string()
                    .required(formErrorMessages.required),
        password: yup.string()
                    .required(formErrorMessages.required)
                    .min(6, `${formErrorMessages.min} 6`),
        confirmPassword: yup.string()
                    .required(formErrorMessages.required)
                    .oneOf([yup.ref('password'), null], formErrorMessages.passwordMatch)
    })

    const initialValues = {
        currentPassword: initialFormValues.currentPassword,
        password: initialFormValues.password,
        confirmPassword: initialFormValues.confirmPassword
    }

    const handleChangePassword = async ({currentPassword, password}) => {
        setIsSubmitting(true);

        await dispatch(changePassword({
            userId,
            currentPassword,
            newPassword : password
        }));

        setIsSubmitting(false);
    }

    const {
        values,
        errors,
        isValid,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleChangePassword
    });

    const controlEvents = {
        handleChange,
        handleBlur
    }

    return {
        values,
        controlEvents,
        errors,
        isValid,
        touched,
        isSubmitting,
        handleSubmit,
        changePasswordSuccess,
        changePasswordError
    }
}