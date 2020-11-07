const userSchema = {
    'email' : {
        type: 'string',
        required: true,
        trim: true
    },
    'password' : {
        type: 'string',
        required: true,
        minlength: 6 
    },
    'firstName' : {
        type: 'string',
        required: true,
        maxlength: 50
    },
    'lastName' : {
        type: 'string',
        maxlength: 50
    },
    'notifications' : {
        type: 'boolean',
        default: true
    },
    'token' : {
        type: 'string'
    }
};

module.exports = userSchema;