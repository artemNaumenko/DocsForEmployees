import admin from "firebase-admin";

export async function getLinkOfFileByName(fileName:string): Promise<string> {
    const bucketName = "gs://docksforemployee.appspot.com/"

    const file = admin.storage().bucket(bucketName).file(fileName);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: new Date(Date.now() + 3600000) // URL will expire in 1 hour
    });

    return url;
}