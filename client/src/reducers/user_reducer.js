export default function(state={}, {type, payload}) {
    switch(type) {
        case 'CREATE_USER':
            return {
                ...state, 
                createUserSuccess: payload.createUserSuccess,
                createUserError: payload.createUserError
            }
        case 'LOGIN_USER' :
            return {
                ...state, 
                isAuth: payload.isAuth,
                loginError: payload.error
             }
        case 'USER_AUTH' :
            if (payload.error) {
                return {
                    ...state, 
                    authError: payload.error,
                    isAuth: false
                }
            }

            return {
                ...state,
                authError: null,
                isAuth: true,
                id: payload.id || null,
                email: payload.email || null, 
                firstName: payload.firstName || '',
                lastName: payload.lastName || ''
            }
        case 'CLEAR_USER' :
            return {
                ...state, 
                authError: null,
                isAuth: false,
                id: null,
                email: null, 
                firstName: '',
                lastName: ''
            }
        case 'EDIT_USER':
            return {
                ...state,
                ...payload
            }
        case 'CHANGE_PASSWORD' :
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}