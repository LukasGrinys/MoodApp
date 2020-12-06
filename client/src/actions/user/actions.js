export const actions = {
    createUser : {
        request : 'CREATE_USER_REQUEST',
        receive : 'CREATE_USER_RECEIVE',
        reset: 'CREATE_USER_RESET'
    },
    loginUser : {
        request : 'LOGIN_USER_REQUEST',
        receive : 'LOGIN_USER_RECEIVE'
    },
    clearUserData : 'CLEAR_USER',
    userAuth: 'USER_AUTH',
    editUser : {
        request : 'EDIT_USER_REQUEST',
        receive : 'EDIT_USER_RECEIVE',
        reset : 'EDIT_USER_RESET'
    },
    changePassword : {
        request : 'CHANGE_PASSWORD_REQUEST',
        receive : 'CHANGE_PASSWORD_RECEIVE',
        reset : 'CHANGE_PASSWORD_RESET'
    }
}