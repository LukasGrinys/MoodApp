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
    const request = axios.get('/api/logout')
    return (dispatch) => {
        request.then( (response) => {
            if (response.status === 200) {
                cookie.remove('auth');
                dispatch({
                    type: 'CLEAN_USER',
                    payload: {}
                })
            }
        })
    }
}

export function deleteUser() {
    return (dispatch) => {
        dispatch({
            type: 'CLEAN_USER',
            payload: {}
        });
        dispatch({
            type: 'CLEAN_LOGS',
            payload: {}
        });
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

export function viewLog(id) {
    const request = axios.get(`/api/getLog?id=${id}`);
    return (dispatch) => {
        request.then(( {data} ) => {
            dispatch({
                type: 'GET_LOG',
                payload: data
            })
        })
    }
}

export function clearLog() {
    return {
        type: 'CLEAR_LOG',
        payload: {}
    }
}

export function getLogs(user, start, limit, logs) {
    const request = axios.get(`/api/getLogs?id=${user}&skip=${start}&limit=${limit}`)
    .then( (response) =>  {
        if (response.data === "No logs found") {
            return [...logs, response.data]
        }
        if (logs) {
            return [...logs, ...response.data]
        } else {
            return response.data
        }
    });
    return {
        type: 'GET_LOGS',
        payload: request
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

export function getAllLogs(user) {
    const request = axios.get(`/api/getLogs?id=${user}&limit=100`)
    .then( (response) =>  {
        if (response.data === "No logs found") {
            return []
        } else {
            return response.data
        }
    });
    return {
        type: 'GET_LOGS',
        payload: request
    }
}


export function clearLogs() {
    return {
        type: 'CLEAR_LOGS',
        payload: null
    }
}
