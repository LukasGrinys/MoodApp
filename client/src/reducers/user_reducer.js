export default function(state={}, {type, payload}) {
    switch(type) {
        case 'CREATE_USER':
            return {...state, success:payload.success, error:payload.error }
        case 'LOGIN_USER' :
            return {...state, data: payload.data }
        case 'USER_AUTH' :
            const { error } = payload;

            if (error) {
                return {
                    ...state, 
                    authError: error,
                    isAuth: false
                }
            }

            return {
                ...state,
                authError: null,
                isAuth: true
            }
            
        case 'CLEAN_USER' :
            return {...state, data: payload}
        default:
            return state;
    }
}