import {db} from "../../../index";

export async function getUsersHaveAccessToFile(fileId: string) {
    const sql = `SELECT u.id, u.name, u.phone_number, r.role_name
                 FROM users u
                 INNER JOIN documents_users du ON u.id = du.user_id
                 INNER JOIN roles_users ru ON u.id = ru.user_id
                 INNER JOIN roles r ON r.id = ru.role_id
                 WHERE du.document_id = ${fileId}
                 ORDER BY u.name;`

    const result = await db.query(sql)

    return result.rows
}