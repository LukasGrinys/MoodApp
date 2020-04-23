export default function(state={}, action) {
    switch(action.type) {
        case 'CREATE_USER':
            return {...state, success:action.payload.success, error:action.payload.error }
        case 'LOGIN_USER' :
            return {...state, data: action.payload.data }
        case 'USER_AUTH' :
            return {...state, data: action.payload }
        case 'CLEAN_USER' :
            return {...state, data: action.payload}
        default:
            return state;
    }
}