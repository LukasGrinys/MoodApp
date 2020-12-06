import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { initialFormValues } from '../../constants/initialFormValues';
import * as yup from 'yup';
import { formErrorMessages } from '../../constants/formErrorMessages';
import { routerRoutes } from '../../constants/routerRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/user/asyncActions';

export const useLoginForm = () => {
    const [ isLoggingIn, setIsLoggingIn ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuth = useSelector( ({user}) => user.isAuth);
    const loginError = useSelector( ({user}) => user.authError !== 'Authentication error' ? user.authError : null);

    useEffect( () => {
        if (isAuth) {
            history.push(routerRoutes.dashboard);
        }
    }, [isAuth, history]);

    const initialValues = {
        email: initialFormValues.email,
        password: initialFormValues.password
    }

    const validationSchema = yup.object({
        email: yup
            .string()
            .required(formErrorMessages.required)
            .email(formErrorMessages.email),
        password: yup
            .string()
            .required(formErrorMessages.required)
    });

    const handleLogin = useCallback( async (values) => {
        setIsLoggingIn(true);
        await dispatch(loginUser(values))
        setIsLoggingIn(false);
    }, [dispatch])

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
        onSubmit: handleLogin
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
        isLoggingIn,
        handleSubmit,
        loginError
    }
}