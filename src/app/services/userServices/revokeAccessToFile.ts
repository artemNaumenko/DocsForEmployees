import {db} from "../../../index";

export async function revokeAccessToFile(userId: string, fileId:string) {
    const sql = `DELETE FROM documents_users
                 WHERE document_id = ${fileId} AND user_id = ${userId};`

    await db.query(sql)
}