import axios from 'axios';
import { actions } from './actions';

export const canUserLog = async (currentDate, currentTiming, user) => {
    const body = {
        userId: user,
        date: currentDate,
        timing: currentTiming
    };

    return async dispatch => {
        const { data } = await axios.post('/api/canLog', body);

        dispatch({type: actions.canLog.request})
        
        if (data && data.data) {
            dispatch({
                type: actions.canLog.receive,
                payload: data.data.canLog
            })

            return;
        }

        dispatch({
            type: actions.canLog.receive,
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
        dispatch({type: actions.getLastLogs.request});

        try {
            const { data } = await axios.get(url);
            const { success, error } = data;
    
            if (error) {
                dispatch({
                    type: actions.getLastLogs.receive,
                    payload: {
                        logs: [],
                        error: error,
                        isFetching: false
                    }
                });
    
                return;
            }
    
            if (success && data.data) {
                dispatch({
                    type: actions.getLastLogs.receive,
                    payload: {
                        logs: data.data,
                        error: null,
                        isFetching: false
                    }
                });
    
                return;
            }
        } catch (error) {
            dispatch({
                type: actions.getLastLogs.receive,
                payload: {
                    logs: [],
                    error: error,
                    isFetching: false
                }
            });
        }
    }
}

export const clearLastLogs = () => dispatch => dispatch({type: actions.getLastLogs.reset});

export const getLog = async logId => {
    return async dispatch => {
        const endpoint = `/api/getLog?id=${logId}`;

        dispatch({type: actions.getLog.request});

        try {
            const response = await axios.get(endpoint);
            
            const { error, data } = response.data;

            if (error) {
                dispatch({
                    type: actions.getLog.receive,
                    payload: {
                        isFetching : false,
                        error,
                        logData : {}
                    }
                });

                return;
            }
            
            dispatch({
                type: actions.getLog.receive,
                payload: {
                    isFetching : false,
                    error : false,
                    logData : data
                }
            });
        } catch (error) {
            dispatch({
                type: actions.getLog.receive,
                payload: {
                    isFetching : false,
                    error,
                    logData : {}
                }
            });
        }
    }
}

export const clearLog = () => dispatch => { dispatch({type: actions.getLog.reset}) }

export const getLogs = async ({userId, start, limit, currentLogs}) => {
    return async dispatch => {
        const endpoint = `/api/getLogs?id=${userId}${start ? `&skip=${start}` : ''}&limit=${limit}`;

        dispatch({ type: actions.getLogs.request });

        try {
            const response = await axios.get(endpoint);
            const { data, error } = response.data;

            if (error) {
                dispatch({
                    type: actions.getLogs.receive,
                    payload: {
                        isFetching: false,
                        error
                    }
                });

                return;
            }
            
            dispatch({
                type: actions.getLogs.receive,
                payload: {
                    isFetching: false,
                    error: false,
                    logs: currentLogs ? [...currentLogs, ...data] : data,
                    noLogsLeft: !data.length ? true : false
                }
            });
        } catch (error) {
            dispatch({
                type: actions.getLogs.receive,
                payload: {
                    isFetching: false,
                    error
                }
            });
        }
    }
}

export const clearLogs = () => dispatch => { dispatch({ type: actions.getLogs.reset }) }

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
            dispatch( {type: actions.postLog.request});
    
            const { data } = await axios.post('/api/postLog', body);
            const { error , success } = data;

            if (error || !success) {
                dispatch({
                    type: actions.postLog.receive,
                    payload: {
                        isPosting : false,
                        success : false,
                        error : error || 'Unknown error occured'
                    }
                });

                return;
            }

            dispatch({
                type: actions.postLog.receive,
                payload: {
                    isPosting : false,
                    success : true,
                    error : null
                }
            })
        } catch (error) {
            dispatch({
                type: actions.postLog.receive,
                payload: {
                    isPosting : false,
                    success : false,
                    error
                }
            })
        }
    }  
}

export const clearLogPost = () => dispatch => { dispatch( {type: actions.postLog.reset})};