export default function(state={}, action) {
    const { payload, type } = action;

    switch(type) {
        case 'CAN_LOG' :
            return {
                ...state, 
                canLog: payload
            };
        case 'GET_LAST_LOGS' : 
            return {
                ...state, 
                ...payload
            };
        case 'GET_MOOD_STATUS' :
            return {...state, lastNineLogs: action.payload}
        case 'GET_LOG' :
            return {...state, logInfo: action.payload}
        case 'CLEAR_LOG' :
            return {...state, logInfo: action.payload}
        case 'GET_LOGS' :
            return {
                ...state, list: action.payload}
        case 'POST_LOG' :
            return {
                ...state, 
                ...payload
            }
        case 'CLEAR_LOGS' :
            return {lastLogs: action.payload, data: action.payload}
        case 'CLEAR_LAST_LOGS' :
            return {...state, lastLogs: action.lastLogs}
        default:
            return state;
    }
}