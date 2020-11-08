export default function(state={}, action) {
    const { payload } = action;
    switch(action.type) {
        case 'CAN_LOG' :
            return {
                ...state, 
                canLog: payload
            };
        case 'CANNOT_LOG' :
            return {...state, data: action.payload};
        case 'GET_LAST_LOGS' : 
            return {...state, lastLogs: action.lastLogs};
        case 'GET_MOOD_STATUS' :
            return {...state, lastNineLogs: action.payload}
        case 'GET_LOG' :
            return {...state, logInfo: action.payload}
        case 'CLEAR_LOG' :
            return {...state, logInfo: action.payload}
        case 'GET_LOGS' :
            return {...state, list: action.payload}
        case 'POST_LOG' :
            return {...state, logPosted: action.payload}
        case 'CLEAR_POST_LOG' :
            return {...state, logPosted: action.payload}
        case 'CLEAR_LOGS' :
            return {lastLogs: action.payload, data: action.payload}
        case 'CLEAR_LAST_LOGS' :
            return {...state, lastLogs: action.lastLogs}
        default:
            return state;
    }
}