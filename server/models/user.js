const mongoose = require('mongoose');
const config = require('./../config').get(process.env.NODE_ENV);
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    notifications: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    })
}

userSchema.methods.hashNewPassword = function(newPassword, callback) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
        if (err) return callback(err);
        bcrypt.hash(newPassword, salt, null, function(err, hash) {
            if (err) return callback(err);
            callback(null, hash);
        })
    })
}

userSchema.methods.generateToken = function(callback) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token = token;
    user.save(function(err, user){
        if (err) return callback(err);
        return callback (null, user)
    });
}

userSchema.statics.findByToken = function(token, callback) {
    const user = this;
    jwt.verify(token, config.SECRET, function(err, decode) {
        user.findOne({"_id" : decode, "token" : token}, function(err, user) {
            if (err) return callback (err);
            callback (null, user);
        })
    })
}

userSchema.methods.deleteToken = function(token, callback) {
    var user = this;
    user.update({$unset:{token: 1}}, (err,user) => {
        if (err) return callback(err);
        callback(null, user);
    })
}

const User = mongoose.model('User', userSchema);
module.exports = { User };
