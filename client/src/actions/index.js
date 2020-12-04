import axios from 'axios';
import Cookie from 'universal-cookie';
const cookie = new Cookie();

export const createUser = async (user) => {
    return async dispatch => {
        dispatch({
            type: 'CREATE_USER',
            payload: {
                createUserSuccess: null,
                createUserError: null
            }
        });

        try {
            const { data } = await axios.post('/api/users', user)
        
            if (!data) {
                dispatch({
                    type: 'CREATE_USER',
                    payload: {
                        createUserSuccess: false,
                        createUserError: 'Unknown error'
                    }
                });

                return;
            }

            const { success, error } = data;

            if (error || !success) {
                dispatch({
                    type: 'CREATE_USER',
                    payload: {
                        createUserSuccess: false,
                        createUserError: error || 'Could not create user'
                    }
                });

                return;
            }
            
            if (success) {
                dispatch({
                    type: 'CREATE_USER',
                    payload: {
                        createUserSuccess: true,
                        createUserError: null
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'CREATE_USER',
                payload: {
                    createUserSuccess: false,
                    createUserError: error || 'Could not create user'
                }
            });
        }
    }
}

export const loginUser = async (payload) => {
    return async dispatch => {
        try {
            dispatch({
                type: 'LOGIN_USER',
                payload: {
                    isAuth: false,
                    error: null
                }
            });

            const { data } = await axios.post('/api/login', payload);

            const { isAuth, error, id, email } = data;

            if (error) {
                dispatch({
                    type: 'LOGIN_USER',
                    payload: {
                        isAuth: false,
                        error
                    }
                });

                return;
            }

            if (isAuth) {
                dispatch({
                    type: 'LOGIN_USER',
                    payload: {
                        isAuth,
                        error: null,
                        id,
                        email
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'LOGIN_USER',
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

    return (dispatch) => {
        request.then( (response) => {
            if (response.status === 200) {
                cookie.remove('auth');
                
                dispatch({
                    type: 'CLEAR_USER',
                    payload: {}
                })
            }
        })
    }
}

export function auth() {
    const request = axios.get('/api/auth')
    .then( ({data}) => data);

    return {
        type: 'USER_AUTH',
        payload: request
    }
}

export const editUserDetails = async ({userId, details}) => {
    return async dispatch => {
        const endpoint = '/api/editAccount';
        const body = {
            id : userId,
            ...details
        }

        dispatch({
            type: 'EDIT_USER',
            payload: {
                isEditingUser: true,
                editUserSuccess: null,
                editUserError: null
            }
        });

        try {
            const { error } = await axios.post(endpoint, body);

            if (error) {
                dispatch({
                    type: 'EDIT_USER',
                    payload: {
                        isEditingUser: false,
                        editUserSuccess: false,
                        editUserError: error
                    }
                });

                return
            }

            dispatch({
                type: 'EDIT_USER',
                payload: {
                    isEditingUser: false,
                    editUserSuccess: true,
                    editUserError: null
                }
            });
        } catch (error) {
            console.error(error);

            dispatch({
                type: 'EDIT_USER',
                payload: {
                    isEditingUser: false,
                    editUserSuccess: false,
                    editUserError: error
                }
            });
        }
    }
}

export const clearEditUser = () => {
    return dispatch => {
        dispatch({
            type: 'EDIT_USER',
            payload: {
                isEditingUser: false,
                editUserSuccess: null,
                editUserError: null
            }
        });
    }
}

// CHANGE PASSWORD

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

        await clearChangePassword();

        try {
            const { error } = await axios.post(endpoint, body);

            if (error) {
                dispatch({
                    type: 'CHANGE_PASSWORD',
                    payload: {
                        isChangingPassword : false,
                        changePasswordError : error,
                        changePasswordSuccess : false
                    }
                });

                return;
            }

            dispatch({
                type: 'CHANGE_PASSWORD',
                payload: {
                    isChangingPassword : false,
                    changePasswordError : null,
                    changePasswordSuccess : true
                }
            });
        } catch (error) {
            console.error(error);

            dispatch({
                type: 'CHANGE_PASSWORD',
                payload: {
                    isChangingPassword : false,
                    changePasswordError : error,
                    changePasswordSuccess : false
                }
            });
        }
    }
}

export const clearChangePassword = async () => {
    return dispatch => {
        dispatch({
            type: 'CHANGE_PASSWORD',
            payload: {
                isChangingPassword: false,
                changePasswordError: null,
                changePasswordSuccess: null
            }
        })
    }
}

export const clearUserData = async () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_USER',
            payload: {}
        })
    }
}

// LOGS //
export const canUserLog = async (currentDate, currentTiming, user) => {
    const body = {
        userId: user,
        date: currentDate,
        timing: currentTiming
    };

    return async dispatch => {
        const { data } = await axios.post('/api/canLog', body);
        
        if (data && data.data) {
            dispatch({
                type: 'CAN_LOG',
                payload: data.data.canLog
            })

            return;
        }

        dispatch({
            type: 'CAN_LOG',
            payload: false
        })
    }
}

export const getLastLogs = async ({
    userId,
    limit = 9
}) => {
    const url = `/api/getLogs?id=${userId}&limit=${limit}`;

    return async dispatch => {
        dispatch({
            type: 'GET_LAST_LOGS',
            payload: {
                lastLogs: [],
                logFetchError: null,
                isFetchingLogs: true
            }
        });

        const { data } = await axios.get(url);

        const { success, error } = data;

        if (error) {
            dispatch({
                type: 'GET_LAST_LOGS',
                payload: {
                    lastLogs: [],
                    logFetchError: error,
                    isFetchingLogs: false
                }
            });

            return;
        }

        if (success && data.data) {
            dispatch({
                type: 'GET_LAST_LOGS',
                payload: {
                    lastLogs: data.data,
                    logFetchError: null,
                    isFetchingLogs: false
                }
            });

            return;
        }

        dispatch({
            type: 'GET_LAST_LOGS',
            payload: {
                lastLogs: [],
                logFetchError: null,
                isFetchingLogs: false
            }
        });
    }
}

export function clearLastLogs() {
    return {
        type: "CLEAR_LAST_LOGS",
        lastLogs: null
    }
}

export const getLog = async logId => {
    return async dispatch => {
        const endpoint = `/api/getLog?id=${logId}`;

        dispatch({
            type: 'GET_LOG',
            payload: {
                isFetchingLog : true,
                getLogError : null,
                logData : {}
            }
        });

        try {
            const { data, error } = await axios.get(endpoint);
            
            if (error) {
                dispatch({
                    type: 'GET_LOG',
                    payload: {
                        isFetchingLog : false,
                        getLogError : error,
                        logData : {}
                    }
                });

                return
            }
            
            dispatch({
                type: 'GET_LOG',
                payload: {
                    isFetchingLog : false,
                    getLogError : false,
                    logData : (data && data.data) ? data.data : {}
                }
            });
        } catch (error) {
            console.error(error);

            dispatch({
                type: 'GET_LOG',
                payload: {
                    isFetchingLog : false,
                    getLogError : error,
                    logData : {}
                }
            });
        }
    }
}

export const clearLog = () => {
    return dispatch => {
        dispatch({
            type: 'GET_LOG',
            payload: {
                isFetchingLog : false,
                getLogError : null,
                logData : {}
            }
        });
    }
}

export const getLogs = async ({userId, start, limit, currentLogs}) => {
    return async dispatch => {
        const endpoint = `/api/getLogs?id=${userId}${start ? `&skip=${start}` : ''}&limit=${limit}`;

        dispatch({
            type: 'GET_LOGS',
            payload: {
                isFetchingAllLogs: true,
                fetchAllLogsError: null
            }
        });

        try {
            const { data, error } = await axios.get(endpoint);

            if (error) {
                dispatch({
                    type: 'GET_LOGS',
                    payload: {
                        isFetchingAllLogs: false,
                        fetchAllLogsError: error
                    }
                });

                return;
            }

            if (data && data.data) {
                dispatch({
                    type: 'GET_LOGS',
                    payload: {
                        isFetchingAllLogs: false,
                        fetchAllLogsError: false,
                        allLogs: currentLogs ? [...currentLogs, ...data.data] : data.data,
                        noLogsLeft: !data.data.length ? true : false
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'GET_LOGS',
                payload: {
                    isFetchingAllLogs: false,
                    fetchAllLogsError: error
                }
            });
        }

    }
}

export const clearLogs = () => {
    return dispatch => {
        dispatch({
            type: 'GET_LOGS',
            payload: {
                isFetchingAllLogs: false,
                fetchAllLogsError: null,
                allLogs: null,
                noLogsLeft: false
            }
        })
    }
}

export const postLog = async ({
    userId,
    date,
    timing,
    rating,
    text
}) => {
    const body = {
        userId,
        date,
        timing,
        rating,
        text
    }

    return async dispatch => {
        try {
            dispatch( {
                type: 'POST_LOG',
                payload: {
                    isPostingLog : true,
                    postLogSuccess : null,
                    postLogError : null
                }
            });
    
            const { data } = await axios.post('/api/postLog', body);
            const { error , success } = data;

            if (error || !success) {
                dispatch({
                    type: 'POST_LOG',
                    payload: {
                        isPostingLog : false,
                        postLogSuccess : false,
                        postLogError : error || 'Unknown error occured'
                    }
                });

                return;
            }

            dispatch({
                type: 'POST_LOG',
                payload: {
                    isPostingLog : false,
                    postLogSuccess : true,
                    postLogError : null,
                    canLog : false
                }
            })
        } catch (error) {
            console.error(error);

            dispatch({
                type: 'POST_LOG',
                payload: {
                    isPostingLog : false,
                    postLogSuccess : false,
                    postLogError : error
                }
            })
        }
    }  
}

export function clearLogPost() {
    return {
        type: 'POST_LOG',
        payload: {
            isPostingLog : false,
            postLogSuccess : null,
            postLogError : null
        }
    }
}