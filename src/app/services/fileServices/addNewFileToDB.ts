import {db} from "../../../index";

export async function addNewFileToDB(fileName: string) {
    try {
        await db.query(`INSERT INTO documents (file_name) VALUES ('${fileName}');`)
    } catch (e) {
        throw e
    }
}