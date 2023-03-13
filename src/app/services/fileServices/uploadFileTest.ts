import admin from "firebase-admin";

export function uploadFileTest(){

    const filePath = "C:\\Users\\Artem\\WebstormProjects\\DocsForEmploees\\test.pdf";
    const uploadOptions = {
        destination: "test.pdf",
        metadata: {
            contentType: "application/pdf"
        }
    };

    const bucket = admin.storage().bucket();

    bucket.upload(filePath, uploadOptions, function(err, file) {
        if (err) {
            console.error(err);
        } else {
            console.log("File uploaded successfully.");
        }
    });
}

export async function uploadFile(fileName: string, fileBytes: any) {
    const bucketName = "gs://docksforemployee.appspot.com/";
    const filePath = fileName;
    const fileContent = Buffer.from(fileBytes, 'base64'); // replace with your file's bytes

    const file = admin.storage().bucket(bucketName).file(filePath);
    const writeStream = file.createWriteStream({
        resumable: false, // optional, set to false for small uploads
        contentType: 'application/pdf' // replace with your file's content type
    });

    writeStream.on('error', (error) => {
        console.error(error);

    });

    writeStream.on('finish', () => {
        console.log(`File ${filePath} uploaded successfully.`);
    });

    writeStream.end(fileContent);
}

export async function getLink() {
    const bucketName = "gs://docksforemployee.appspot.com/"
    const filePath = 'test.pdf';

    const file = admin.storage().bucket(bucketName).file(filePath);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2023' // expiration date in MM-DD-YYYY format
    });

    console.log(url);
}