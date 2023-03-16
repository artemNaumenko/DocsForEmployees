import {db} from "../../../index";

export async function getAllAvailableFiles(phoneNumber:string, hasAlreadyRead: boolean) {
    try {
        const sql: string = `SELECT documents.id, documents.file_name, documents.created_at
                             FROM documents
                             JOIN documents_users ON documents_users.document_id = documents.id
                             JOIN users ON users.id = documents_users.user_id
                             WHERE users.phone_number = '${phoneNumber}'
                                 AND documents_users.has_already_read = ${hasAlreadyRead}
                             ORDER BY documents.created_at DESC;`

        const result = await db.query(sql)

        return result.rows
    } catch (e) {
        throw e
    }
}