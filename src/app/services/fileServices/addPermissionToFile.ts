import {db} from "../../../index";

export async function addPermissionToFile(userPhoneNumbers: [string], fileName: string) {
    try{
        const listOfUsers: string = userPhoneNumbers.map(phoneNumber => {return `'${phoneNumber}'`}).join(", ")

        const sql: string = `WITH document_id AS (
                                 SELECT id FROM documents WHERE file_name = '${fileName}'
                             ),
                             user_ids AS (
                                 SELECT id FROM users WHERE phone_number IN (${listOfUsers})
                             )
                             INSERT INTO documents_users (user_id, document_id)
                             SELECT user_ids.id, document_id.id FROM user_ids, document_id;`

        await db.query(sql)
    } catch (e){
        throw e
    }
}