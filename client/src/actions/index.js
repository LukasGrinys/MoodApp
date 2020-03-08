import axios from 'axios';

export function createUser(user) {
    const request = axios.post('/api/users', user)
    return (dispatch) => {
        request.then( ( {data} ) => {
            let response = {
                success: data.success
            }
            dispatch({
                type: 'CREATE_USER',
                payload: response
            })
        })
    }
}

export function loginUser(user) {
    const request = axios.post('/api/login', user)
    return (dispatch) => {
        request.then( ({data}) => {
            let response = {
                data: data
            }
            dispatch({
                type: 'LOGIN_USER',
                payload: response
            })
        })
    }
}

export function auth() {
    const request = axios.get('/api/auth')
    .then(response => response.data );
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
            let response = {
                canLog: data.canLog
            }
            dispatch({
                type: 'CAN_LOG',
                payload: response
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
        request.then( (data) => {
        dispatch({
            type: 'GET_LAST_LOGS',
            lastLogs: data
            })
        })
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
        ownerId: user,
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