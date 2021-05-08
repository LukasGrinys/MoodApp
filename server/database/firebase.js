const firebaseAdmin = require('firebase-admin');
const serviceAccount = process.env.NODE_ENV !== 'production' ? require('./devAccount') : require('./serviceAccount');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore(); 

const FieldValue = firebaseAdmin.firestore.FieldValue;

module.exports = { db, FieldValue }; 