const { db } = require('../database/firebase');
const { COLLECTION_NAMES } = require('../database/constants');

const {
    hashPassword,
    doesUserExist,
    findUserByEmail,
    comparePassword,
    generateToken,
    findUserByToken,
    deleteToken
} = require('../util/helpers');

const { validator } = require('../util/validator');
const userSchema = require('../schemas/userSchema');

const registerNewUser = async (body) => {
    if (!body.password) {
        return {error: "No password was provided"}
    };

    const { error, data } = validator({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    }, userSchema);

    if (error || !data) return { error : error || 'Values were not valid' }

    try {
        const { firstName, lastName, email, password } = data;

        const userExists = await doesUserExist(email);
        if (userExists) return  { error : "User already exists" }

        const hash = await hashPassword(password);

        if (hash) {
            await db.collection(COLLECTION_NAMES.users).doc().set({
                email,
                firstName,
                lastName,
                password: hash,
                notifications: true,
                token: ''
            });

            return { success : true }
        }
    } catch (error) {
        return { error }
    }
}

const loginUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        if (!user || user.error || !user.data) return {
            error: user.error ? user.error : 'User not found'
        }
        
        const isMatch = await comparePassword(password, user.data.password);
        if (!isMatch) return { error : 'Wrong password'}

        const { error, token } = generateToken(user.data.id);
        if (error || !token) return {error: 'Error: could not generate new token'};

        if (token) {
            await db.collection(COLLECTION_NAMES.users).doc(user.data.id).update({token});

            return {
                data: {
                    token,
                    id: user.data.id,
                    email: user.data.email
                }
            }
        }
    } catch (error) {
        return { error }
    }
}

const logOutUser = async (token) => {
    const user = await findUserByToken(token);

    if (user.error || !user.data || !user.data.id ) return { error : error || 'Error : Could not find user'}

    const userId = user.data.id;

    const { error } = await deleteToken(userId);

    if (error) return { error };
    
    return { success : true }
}

const editAccount = async (id, details) => {
    const { error, data } = validator({
        firstName: details.firstName,
        lastName: details.lastName
    }, userSchema);

    if (error || !data ) return { error : error || 'Error : Validation error occured'}

    try {
        const {
            firstName,
            lastName
        } = data;

        await db.collection(COLLECTION_NAMES.users).doc(id).update({
            firstName,
            lastName
        });

        return { success : true }
    } catch (error) {
        return { error }
    }  
}

const getUser = async (id) => {
    try {
        const userRef = await db.collection(COLLECTION_NAMES.users).doc(id).get();

        if (!userRef.exists) {
            return {error : "User not found"}
        }

        const data = userRef.data();
        delete data.password;

        return {
            data : {
                id,
                ...data
            }
        }
    } catch (error) {
        return {error}
    }
}

const changePassword = async (id, oldPassword, newPassword) => {
    try {
        const user = await db.collection(COLLECTION_NAMES.users).doc(id).get();
        const userData = user.data();
        
        const isMatch = await comparePassword(oldPassword, userData.password);

        if (!isMatch) return { error : 'Wrong password'}

        const { error, data } = validator({
            password: newPassword
        }, userSchema);
    
        if (error || !data) return { error : error || 'Error : Validation error occured'}
        
        const { password } = data;

        const hash = await hashPassword(password);

        await db.collection(COLLECTION_NAMES.users).doc(id).update({
            password: hash
        })

        return { success : true }
    } catch(error) {
        return { error }
    }
}

const deleteUser = async (id, password) => {
    try {
        const user = await db.collection(COLLECTION_NAMES.users).doc(id).get();
        const userData = user.data();

        const isMatch = await comparePassword(password, userData.password);
        if (!isMatch) return { error : 'Wrong password'}

        await db.collection(COLLECTION_NAMES.users).doc(id).delete();

        return { success : true }
    } catch (error) {
        console.log({error})
        return { error }
    }
}

module.exports = { 
    registerNewUser,
    loginUser,
    logOutUser,
    editAccount,
    getUser,
    changePassword,
    deleteUser
};
