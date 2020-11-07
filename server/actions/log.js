const { db, FieldValue } = require('../database/firebase');
const { COLLECTION_NAMES } = require('../database/constants');

const { doesLogExist } = require('../util/helpers');
const { validator } = require('../util/validator');
const logSchema = require('../schemas/logSchema');

const postLog = async ({body}) => {
    const { error, data } = validator({
        userId: body.userId,
        date: body.date,
        timing: body.timing,
        rating: body.rating,
        text: body.text
    }, logSchema);

    if (error || !data) return { error : error || 'Error : Validation error'}

    try {
        const { userId, date, timing, rating, text } = data;
        const doesExist = await doesLogExist({
            userId,
            date,
            timing
        });
    
        if (doesExist) return { error : 'Error : User cannot post new log yet'}
        
        await db.collection(COLLECTION_NAMES.logs).add({
            userId,
            date,
            timing,
            rating,
            text,
            createdAt: FieldValue.serverTimestamp()
        });

        return { success: true }
    } catch (error) {
        return { error }
    }
}

const getLog = async ({id, userId}) => {
    try {
        const logRef = await db.collection(COLLECTION_NAMES.logs).doc(id).get();

        if (!logRef.exists) {
            return {error : 'Log not found'}
        }

        const logOwnerId = logRef.data().userId;

        if (logOwnerId !== userId) {
            return { error : 'Error : User cannot get this log'}
        }

        return {
            data : {
                id,
                ...logRef.data()
            }
        }
    } catch (error) {
        return {error}
    }
}

const getLogs = async ({userId, skip, limit}) => {
    try {
        const query = db.collection(COLLECTION_NAMES.logs)
                        .where('userId', '==', userId)
                        .orderBy('createdAt', 'desc')
                        .offset(skip)


        const logsRef = limit ? await query.limit(limit).get() : await query.get()

        if (logsRef.empty) {
            return { data : [] }
        }
    
        let data = [];

        logsRef.forEach( log => {
            data.push({
                id: log.id,
                ...log.data()
            })
        });

        return { data }
    } catch (error) {
        return { error }
    }
}

const canLog = async ({date, timing, userId}) => {
    try {
        const doesExist = await doesLogExist({
            userId,
            date,
            timing
        });


        if (doesExist) {
            return { data : {
                canLog : false
            }}
        }

        return { data : {
            canLog : true
        }}
    } catch (error) {
        return { error }
    }
}

module.exports = {
    postLog,
    getLog,
    getLogs,
    canLog
}