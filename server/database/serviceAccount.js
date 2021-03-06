const serviceAccount = {
    "type": "service_account",
    "project_id": "moodapp-f7267",
    "private_key_id": process.env.PRIVATE_DB_KEY_ID,
    "private_key": process.env.PRIVATE_DB_KEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-q04n2@moodapp-f7267.iam.gserviceaccount.com",
    "client_id": "101915873275470025652",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q04n2%40moodapp-f7267.iam.gserviceaccount.com"
}

module.exports = serviceAccount;