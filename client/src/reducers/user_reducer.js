import { actions } from '../actions/user/actions';

const initialState = {
    createUser : {
        success : null,
        error : null
    },
    isAuth: null,
    authError: null,
    userData: {
        id: null,
        email: null, 
        firstName: '',
        lastName: ''
    },
    editUser : {
        isEditing: false,
        success: null,
        error: null
    },
    changePassword: {
        isChangingPassword: false,
        changePasswordError: null,
        changePasswordSuccess: null
    }
}

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case actions.createUser.request :
            return {
                ...state,
                createUser : {
                    success : null,
                    error : null
                }
            }
        case actions.createUser.receive :
            return {
                ...state, 
                createUser : {
                    ...payload
                }
            }
        case actions.createUser.reset :
            return {
                ...state,
                createUser : {
                    ...initialState.createUser
                }
            }
        case actions.loginUser.request :
            return {
                ...state,
                isAuth: null,
                authError: null
            }
        case actions.loginUser.receive:
            return {
                ...state, 
                ...payload
            }
        case actions.userAuth :
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
                userData: {
                    id: payload.id || null,
                    email: payload.email || null, 
                    firstName: payload.firstName || '',
                    lastName: payload.lastName || ''
                }
            }
        case actions.clearUserData :
            return {
                ...state, 
                authError: initialState.authError,
                isAuth: initialState.isAuth,
                userData: {
                    ...initialState.userData
                }
            }
        case actions.editUser.request :
            return {
                ...state,
                editUser : {
                    isEditing: true,
                    success: null,
                    error: null
                }
            }
        case actions.editUser.receive :
            return {
                ...state,
                editUser : {
                    ...payload
                }
            }
        case actions.editUser.reset :
            return {
                ...state,
                editUser : {
                    ...initialState.editUser
                }
            }
        case actions.changePassword.request :
            return {
                ...state,
                changePassword : {
                    isChanging: true,
                    error: null,
                    success: null
                }
            }
        case actions.changePassword.receive :
            return {
                ...state,
                changePassword : {
                    ...payload
                }
            }
        case actions.changePassword.reset : 
            return {
                ...state,
                changePassword : {
                    ...initialState.changePassword
                }
            }
        default:
            return state;
    }
}