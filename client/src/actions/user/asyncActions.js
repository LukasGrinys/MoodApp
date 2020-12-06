import { actions } from './actions';
import axios from 'axios';
import { clearLogs, clearLastLogs } from '../logs/asyncActions';
import Cookie from 'universal-cookie';
const cookie = new Cookie();

export const createUser = async user => {
    return async dispatch => {
        dispatch({type: actions.createUser.request});

        try {
            const { data } = await axios.post('/api/users', user)
            const { success, error } = data;

            if (error || !success) {
                dispatch({
                    type: actions.createUser.receive,
                    payload: {
                        success: false,
                        error: error || 'Could not create user'
                    }
                });

                return;
            }
            
            if (success) {
                dispatch({
                    type: actions.createUser.receive,
                    payload: {
                        success: true,
                        error: null
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: actions.createUser.receive,
                payload: {
                    success: false,
                    error: error || 'Could not create user'
                }
            });
        }
    }
}

export const clearCreateUser = () => dispatch => dispatch({type: actions.createUser.reset});

export const loginUser = async payload => {
    return async dispatch => {
        dispatch({
            type: actions.loginUser.request
        });

        try {
            const { data } = await axios.post('/api/login', payload);
            const { isAuth, error } = data;

            if (error) {
                dispatch({
                    type: actions.loginUser.receive,
                    payload: {
                        isAuth: false,
                        authError : error
                    }
                });

                return;
            }

            if (isAuth) {
                dispatch({
                    type: actions.loginUser.receive,
                    payload: {
                        isAuth,
                        error: null
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: actions.loginUser.receive,
                payload: {
                    isAuth: false,
                    error
                }
            })
        }
    }
}

export function logOut() {
    const request = axios.get('/api/logout');

    return dispatch => {
        request.then( (response) => {
            if (response.status === 200) {
                cookie.remove('auth');
                
                dispatch({
                    type: actions.clearUserData
                });
                
                clearLogs();
                clearLastLogs();
            }
        })
    }
}

export function auth() {
    const response = axios.get('/api/auth')
    .then( ({data}) => data);

    return {
        type: actions.userAuth,
        payload: response
    }
}

export const editUserDetails = async ({userId, details}) => {
    const endpoint = '/api/editAccount';
    const body = {
        id : userId,
        ...details
    }

    return async dispatch => {
        dispatch({type: actions.editUser.request});

        try {
            const { data } = await axios.post(endpoint, body);
            const { error } = data;

            if (error) {
                dispatch({
                    type: actions.editUser.receive,
                    payload: {
                        isEditing: false,
                        success: false,
                        error: error.toString()
                    }
                });

                return
            }

            dispatch({
                type: actions.editUser.receive,
                payload: {
                    isEditing: false,
                    success: true,
                    error: null
                }
            });
        } catch (error) {
            dispatch({
                type: actions.editUser.receive,
                payload: {
                    isEditing: false,
                    success: false,
                    error: error.toString()
                }
            });
        }
    }
}

export const clearEditUser = () => dispatch => {dispatch({type: actions.editUser.reset})}

export const changePassword = async ({
    userId,
    currentPassword,
    newPassword
}) => {
    return async dispatch => {
        if (!userId || !currentPassword || !newPassword) {
            return;
        }

        const endpoint = '/api/changePassword';
        const body = {
            id : userId,
            oldPassword : currentPassword,
            newPassword
        }

        await dispatch({type: actions.changePassword.request});

        try {
            const { error } = await axios.post(endpoint, body);

            if (error) {
                dispatch({
                    type: actions.changePassword.receive,
                    payload: {
                        isChanging : false,
                        error : error,
                        success : false
                    }
                });

                return;
            }

            dispatch({
                type: actions.changePassword.receive,
                payload: {
                    isChanging : false,
                    error : null,
                    success : true
                }
            });
        } catch (error) {
            dispatch({
                type: actions.changePassword.receive,
                payload: {
                    isChanging : false,
                    error : error,
                    success : false
                }
            });
        }
    }
}

export const clearChangePassword = async () => async dispatch => {dispatch({type: actions.changePassword.reset})}

export const clearUserData = async () => async dispatch => {dispatch({type: actions.clearUserData})}