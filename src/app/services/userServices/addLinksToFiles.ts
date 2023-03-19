import {getLinkOfFileByName} from "../fileServices/getLinkOfFileByName";

const async = require('async');

export async function addLinksToFiles(files: any[]) {
    try {
        await new Promise<void>((resolve, reject) => {
            // @ts-ignore
            async.each(files, async (file, callback) => {
                file.link = await getLinkOfFileByName(file.file_name);
                callback();
                // @ts-ignore
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return files;
    } catch (err) {
        console.error('An error occurred:', err);
        throw err;
    }
}