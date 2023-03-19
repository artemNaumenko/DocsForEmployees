import {db} from "../../../index";

export async function getAllFiles() {
    const sql: string = `SELECT * FROM documents
                         ORDER BY created_at DESC;`

    const result = await db.query(sql)

    return result.rows
}