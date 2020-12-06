import { actions } from '../actions/logs/actions';

const initialState = {
    canLog: null,
    lastLogs : {
        logs: [],
        error: null,
        isFetching: false
    },
    singleLog : {
        logData : {},
        error : null,
        isFetching: false
    },
    allLogs : {
        isFetching: false,
        error: null,
        logs: [],
        noLogsLeft: false
    },
    postLog : {
        isPosting : false,
        success : null,
        error : null
    }
}

export default function(state = initialState, {payload, type}) {
    switch(type) {
        case actions.canLog.request :
            return {
                ...state, 
                canLog: null
            };
        case actions.canLog.receive :
            return {
                ...state,
                canLog: payload
            }
        case actions.getLastLogs.request : 
            return {
                ...state,
                lastLogs : {
                    logs: [],
                    error: null,
                    isFetching: true
                }
            }
        case actions.getLastLogs.receive : 
            return {
                ...state, 
                lastLogs : {
                    ...payload
                }
            }
        case actions.getLastLogs.reset :
            return {
                ...state,
                lastLogs : {
                    ...initialState.lastLogs
                }
            }
        case actions.getLog.request : 
            return {
                ...state,
                singleLog : {
                    isFetching : true,
                    error : null,
                    logData : {}
                }
            }
        case actions.getLog.receive :
            return {
                ...state, 
                singleLog : {
                    ...payload  
                }
            }
        case actions.getLog.reset :
            return {
                ...state,
                singleLog : {
                    ...initialState.singleLog
                }
            }
        case actions.getLogs.request :
            return {
                ...state,
                allLogs : {
                    ...state.allLogs,
                    isFetching: true,
                    error: null
                }
            }
        case actions.getLogs.receive :
            return {
                ...state,
                allLogs : {
                    ...state.allLogs,
                    ...payload
                }
            }
        case actions.getLogs.reset :
            return {
                ...state,
                allLogs : {
                    ...initialState.allLogs
                }
            }
        case actions.postLog.request :
            return {
                ...state,
                postLog : {
                    isPosting : true,
                    success: null,
                    error : null
                }
            }
        case actions.postLog.receive :
            if (payload.success) {
                return {
                    ...state,
                    canLog : false,
                    postLog : {
                        ...payload
                    }
                }
            }

            return {
                ...state, 
                postLog : {
                    ...payload
                }
            }
        case actions.postLog.reset : 
            return {
                ...state,
                postLog : {
                    ...initialState.postLog
                }
            }
        default:
            return state;
    }
}