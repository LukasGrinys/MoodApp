const logSchema = {
    'userId' : {
        type: 'string',
        required: true
    },
    'date' : {
        type: 'string',
        required: true
    },
    'timing' : {
        type: 'string',
        required: true
    },
    'rating' : {
        type: 'number',
        default: 'N/A'
    },
    'text' : {
        type: 'string',
        default: 'N/A'
    }
}

module.exports = logSchema;