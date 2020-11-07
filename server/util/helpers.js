const { db } = require('../database/firebase');
const { COLLECTION_NAMES } = require('../database/constants');
const config = require('../config').get(process.env.NODE_ENV);
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password, salt, null, function(error, hash) {
            if (error) {
                reject(error)
            } else {
                resolve(hash)
            }
        })
    });
}

async function doesUserExist(email) {
    const userRef = await db.collection(COLLECTION_NAMES.users).where('email', '==', email).get();
    
    if (userRef.empty) {
        return false
    }
    
    return true
}

async function findUserByEmail(email) {
    const userRef = await db.collection(COLLECTION_NAMES.users).where('email', '==', email).get();

    if (userRef.empty) {
        return {error: "User not found"}
    }
    
    let data = [];

    userRef.forEach( (doc) => {
        const dataObj = {
            id: doc.id,
            ...doc.data()
        }
        data.push(dataObj);
    });

    return { data: data[0] }
}

function comparePassword(candidatePassword, password) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(candidatePassword, password, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}

function generateToken(id) {
    try {
        const token = jwt.sign(id, config.SECRET);
        return { token };
    } catch (error) {
        return { error }
    }
}

async function findUserByToken(token) {
    try {
        const decode = await jwt.verify(token, config.SECRET);
        const userRef = await db.collection(COLLECTION_NAMES.users).doc(decode).get();

        if (userRef.empty) {
            return {error : "User not found"}
        }

        return { data: {id: userRef.id,...userRef.data()}}
    } catch (error) {
        return {error}
    }
}

async function deleteToken(userId) {
    try {
        await db.collection(COLLECTION_NAMES.users).doc(userId).update({
            token: ''
        });

        return {}
    } catch (error) {
        return {error}
    }
}

async function doesLogExist({userId, date, timing}) {
    const logRef = await db.collection(COLLECTION_NAMES.logs)
    .where('userId','==', userId)
    .where('date', '==', date)
    .where('timing', '==', timing)
    .get();

    return !logRef.empty;
} 

module.exports = {
    hashPassword,
    doesUserExist,
    findUserByEmail,
    comparePassword,
    generateToken,
    findUserByToken,
    deleteToken,
    doesLogExist
}