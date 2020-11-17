import axios from 'axios';
import Cookie from 'universal-cookie';
const cookie = new Cookie();

export function createUser(user) {
    const request = axios.post('/api/users', user)
    return (dispatch) => {
        request.then( ( {data} ) => {
            let response = {
                success: data.success,
                error: data.error
            }
            dispatch({
                type: 'CREATE_USER',
                payload: response
            })
        })
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

            const { isAuth, error } = data;

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
                        error: null
                    }
                })
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

export function canUserLog(currentDate, currentTiming, user) {
    const body = {
        userId: user,
        date: currentDate,
        timing: currentTiming
    };
    const request = axios.post('/api/canLog', body);
    return (dispatch) => {
        request.then( ({data}) => {
            dispatch({
                type: 'CAN_LOG',
                payload: data.data.canLog
            })
        })
    }
}

export function userCannotLog() {
    return {
        type: "CANNOT_LOG",
        payload: {}
    }
}

export function getLastLogs(user) {
    const url = `/api/getLogs?id=${user}&limit=9`;
    const request = axios.get(url);
    return (dispatch) => {
        request.then( (response) => {
        dispatch({
            type: 'GET_LAST_LOGS',
            lastLogs: response.data
            })
        })
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

export function postLog(user, date, timing, rating, text) {
    const body = {
        userId: user,
        date,
        timing,
        rating,
        text
    }
    const request = axios.post('/api/postLog', body)
    .then( (response) => {
        return response.data
    });
    return {
        type: 'POST_LOG',
        payload: request
    }
}

export function clearPostLog() {
    return {
        type: 'CLEAR_POST_LOG',
        payload: {}
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
