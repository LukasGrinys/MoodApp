export const actions = {
    canLog : {
        request : 'CAN_LOG_REQUEST',
        receive : 'CAN_LOG_RECEIVE'
    },
    getLastLogs : {
        request : 'GET_LAST_LOGS_REQUEST',
        receive : 'GET_LAST_LOGS_RECEIVE',
        reset : 'GET_LAST_LOGS_RESET'
    },
    getLog : {
        request : 'GET_LOG_REQUEST',
        receive : 'GET_LOG_RECEIVE',
        reset : 'GET_LOG_RESET'
    },
    getLogs : {
        request : 'GET_LOGS_REQUEST',
        receive : 'GET_LOGS_RECEIVE',
        reset : 'GET_LOGS_RESET'
    },
    postLog : {
        request : 'POST_LOG_REQUEST',
        receive : 'POST_LOG_RECEIVE',
        reset : 'POST_LOG_RESET'
    }
}