
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { formErrorMessages } from '../../constants/formErrorMessages';
import { editUserDetails, clearEditUser } from '../../actions';

export const useEditAccount = ({
    firstName,
    lastName
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const { 
        id : userId,
        isEditingUser,
        editUserError,
        editUserSuccess
    } = useSelector( ({user}) => user);

    useEffect( () => {
        return () => {
            dispatch(clearEditUser())
        }
        // eslint-disable-next-line
    }, [])

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required(formErrorMessages.required),
        lastName: yup
            .string()
            .required(formErrorMessages.required)
    });

    const initialValues = {
        firstName,
        lastName
    }

    const handleChangeDetails = async (values) => {
        setIsSubmitting(true);
        await dispatch(editUserDetails({
            userId,
            details: values
        }));
        setIsSubmitting(false);
    }

    const {
        values,
        errors,
        touched,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleChangeDetails
    });

    const controlEvents = {
        handleChange,
        handleBlur
    }

    return {
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
    }
}