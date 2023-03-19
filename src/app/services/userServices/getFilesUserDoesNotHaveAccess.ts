import {db} from "../../../index";

export async function getFilesUserDoesNotHaveAccess(userId: string) {
    const sql = `SELECT *
                 FROM documents
                 WHERE id NOT IN (
                     SELECT document_id
                     FROM documents_users
                     WHERE user_id = ${userId}
                 );`

    const result = await db.query(sql)

    return result.rows
}