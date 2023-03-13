import app from './server';
const config = require('../config.json')
import admin from "firebase-admin";

const bucketName = process.env.FIREBASE_STORE_BUCKET_NAME as string
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName
});

// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);


const startServer = async  () => {
    try {
        app.listen(port, () => {
            console.info('Express application started on port: ' + port);
        });

    } catch (e) {
        console.log("Error: " + e);
    }

}

startServer()