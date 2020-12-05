export default function(state={}, action) {
    const { payload, type } = action;
    /* TODO : Create initial state object */
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
        case 'GET_LOG' :
            return {
                ...state, 
                ...payload
            }
        case 'GET_LOGS' :
            return {
                ...state,
                ...payload
            }
        case 'POST_LOG' :
            return {
                ...state, 
                ...payload
            }
        case 'CLEAR_LOGS' :
            return {
                ...state,
                lastLogs: [],
                allLogs: []
            }
        case 'CLEAR_LAST_LOGS' :
            return {...state, lastLogs: action.lastLogs}
        default:
            return state;
    }
}