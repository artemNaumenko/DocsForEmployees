import app from './server';
const config = require('../config.json')
import admin from "firebase-admin";
const { Client } = require('pg');

// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);


export let db: any;

const startServer = async  () => {
    try {

        //connect to DB
        const cn = JSON.parse(process.env.POSTGRE_SQL_CONFIGURATION as string)

        db = new Client(cn);
        await db.connect();

        //connect to Firebase storage
        const bucketName = process.env.FIREBASE_STORE_BUCKET_NAME as string
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

        await admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: bucketName
        });


        app.listen(port, () => {
            console.info('Express application started on port: ' + port);
        });

    } catch (e) {
        console.log("Error: " + e);
    }

}

startServer()