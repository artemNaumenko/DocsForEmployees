import {db} from "../../../index";

export async function getFilesUserHaveAccess(userId: string) {
    const sql = `SELECT d.*
                 FROM documents d
                 JOIN documents_users du ON d.id = du.document_id
                 WHERE du.user_id = ${userId};`

    const result = await db.query(sql)

    return result.rows
}