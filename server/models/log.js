const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: 'N/A'
    },
    text: {
        type: String,
        default: 'N/A'
    }
}, {timestamps: true});

const Log = mongoose.model('Log', logSchema);
module.exports = { Log };