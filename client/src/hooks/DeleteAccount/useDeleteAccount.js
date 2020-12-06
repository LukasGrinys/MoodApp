import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { initialFormValues } from '../../constants/initialFormValues';
import * as yup from 'yup';
import { formErrorMessages } from '../../constants/formErrorMessages';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearUserData } from '../../actions/user/asyncActions';
import { routerRoutes } from '../../constants/routerRoutes';
import Cookie from 'universal-cookie';
const cookie = new Cookie();

export const useDeleteAccount = () => {
    const [deleteAccountStatus, setDeleteAccountStatus] = useState({
        isDeleting: false,
        error: null,
        success: null
    });
    const { isDeleting, success, error } = deleteAccountStatus;
    const userId = useSelector( ({user}) => user.userData.id);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect( () => {
        if (success) {
            async function clearData() {
                await dispatch(clearUserData());
            }
            
            clearData();
            cookie.remove('auth');
            history.push(routerRoutes.home);
        }
        // eslint-disable-next-line
    }, [success])

    const initialValues = {
        password: initialFormValues.password,
        confirmPassword: initialFormValues.confirmPassword
    }

    const validationSchema = yup.object({
        password: yup
                .string()
                .required(formErrorMessages.required),
        confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], formErrorMessages.passwordMatch)
    });

    const handleDeleteAccount = async ({password}) => {
        if (!userId) {
            return;
        }

        setDeleteAccountStatus( prevStatus => {
            return {
                ...prevStatus,
                isDeleting : true
            }
        });

        const endpoint = `api/deleteAccount?id=${userId}`;
        const body = {
            password
        };

        try {
            const { data } = await axios.post(endpoint, body);
            const { error } = data; 

            if (error) {
                setDeleteAccountStatus({
                    isDeleting: false,
                    error,
                    success: false
                });

                return;
            }

            setDeleteAccountStatus({
                isDeleting: false,
                error: null,
                success: true
            });
        } catch (error) {
            console.error(error);

            setDeleteAccountStatus({
                isDeleting: false,
                error,
                success: false
            });
        }
    }

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
        onSubmit: handleDeleteAccount
    })

    const controlEvents = {
        handleChange,
        handleBlur
    }

    return {
        values,
        errors,
        isValid,
        controlEvents,
        touched,
        handleSubmit,
        isDeleting,
        error
    }
}