import admin from "firebase-admin";

export async function uploadFile(fileName: string, fileBytes: any) {
    try {
        const bucketName = "gs://docksforemployee.appspot.com/";
        const filePath = fileName;
        const fileContent = Buffer.from(fileBytes, 'base64');

        const file = admin.storage().bucket(bucketName).file(filePath);
        const writeStream = file.createWriteStream({
            resumable: false, // optional, set to false for small uploads
            contentType: 'application/pdf'
        });

        writeStream.on('error', (error) => {
            throw error
        });

        writeStream.on('finish', () => {
            return
        });

        writeStream.end(fileContent);
    } catch (e) {
        throw e
    }
}