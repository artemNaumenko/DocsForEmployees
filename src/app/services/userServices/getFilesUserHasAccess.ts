import {db} from "../../../index";

export async function getFilesUserHasAccess(userId: string) {
    const sql = `SELECT d.*, du.has_already_read
                 FROM documents d
                 JOIN documents_users du ON d.id = du.document_id
                 WHERE du.user_id = ${userId};`

    const result = await db.query(sql)

    return result.rows
}