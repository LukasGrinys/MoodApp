import { useCallback, useState, useEffect } from 'react';
import { initialFormValues } from '../../constants/initialFormValues';
import * as yup from 'yup';
import { formErrorMessages } from '../../constants/formErrorMessages';
import { useFormik } from 'formik';
import { createUser, loginUser, clearCreateUser } from '../../actions/user/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { routerRoutes } from '../../constants/routerRoutes';
import { useHistory } from 'react-router-dom';

export const useRegisterForm = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const dispatch = useDispatch();
    const { createUserError, createUserSuccess } = useSelector( ({user}) => {
        if (user && user.createUser) {
            return {
                createUserError : user.createUser.error,
                createUserSuccess : user.createUser.success
            }
        }

        return {}
    });
    const history = useHistory();

    const handleSignup = useCallback( async values => {
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        };

        setIsSigningUp(true);
        await dispatch(createUser(payload));
        setIsSigningUp(false);
    }, [dispatch]);

    const initialValues = {
        firstName: initialFormValues.firstName,
        lastName: initialFormValues.lastName,
        email: initialFormValues.email,
        password: initialFormValues.password,
        confirmPassword: initialFormValues.confirmPassword
    }

    const validationSchema = yup.object({
        firstName: yup.string().required(formErrorMessages.required),
        lastName: yup.string().required(formErrorMessages.required),
        email: yup
            .string()
            .required(formErrorMessages.required)
            .email(formErrorMessages.email),
        password: yup
            .string()
            .required(formErrorMessages.required)
            .min(6, `${formErrorMessages.min} 6`),
        confirmPassword: yup
            .string()
            .required(formErrorMessages.required)
            .oneOf([yup.ref('password'), null], formErrorMessages.passwordMatch)
    });

    const {
        values,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        touched
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSignup
    });

    useEffect( () => {
        if (createUserSuccess) {
            const { email, password } = values;

            dispatch(loginUser({
                email,
                password
            })).then( () => {
                history.push(routerRoutes.home);
            });
        }
        // eslint-disable-next-line
    }, [values, createUserSuccess]);

    useEffect( () => {
        return () => {
            dispatch(clearCreateUser());
        }
        // eslint-disable-next-line
    }, [dispatch])

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
        isSigningUp,
        handleSubmit,
        createUserError
    }
}