import admin from "firebase-admin";

export async function getLinkOfFileByName(fileName:string): Promise<string> {
    const bucketName = "gs://docksforemployee.appspot.com/"

    const file = admin.storage().bucket(bucketName).file(fileName);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2023' // expiration date in MM-DD-YYYY format
    });

    return url;
}