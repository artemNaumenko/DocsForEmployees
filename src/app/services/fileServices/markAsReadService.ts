import {db} from "../../../index";

export async function markAsReadService(phoneNumber: string, fileName: string) {
    try {
        const sql: string = `UPDATE documents_users
                             SET has_already_read = true
                             FROM users
                             JOIN documents ON documents.file_name = '${fileName}'
                             WHERE users.phone_number = '${phoneNumber}'
                                 AND documents.id = documents_users.document_id
                                 AND users.id = documents_users.user_id;`

        await db.query(sql)
        return
    } catch (e) {
        throw e
    }
}