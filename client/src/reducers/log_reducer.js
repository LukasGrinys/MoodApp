export default function(state={}, action) {
    switch(action.type) {
        case 'CAN_LOG' :
            return {...state, data: action.payload};
        case 'GET_LAST_LOGS' : 
            return {...state, lastLogs: action.lastLogs};
        case 'GET_MOOD_STATUS' :
            return {...state, lastNineLogs: action.payload}
        case 'GET_LOG' :
            return {...state, logInfo: action.payload}
        case 'CLEAR_LOG' :
            return {...state, logInfo: action.payload}
        default:
            return state;
    }
}