import {db} from "../../../index";

export async function deleteFile(fileId: string) {
    const sql = `DELETE FROM documents_users WHERE document_id = ${fileId};
                 DELETE FROM documents WHERE id = ${fileId};`

    await db.query(sql)
}