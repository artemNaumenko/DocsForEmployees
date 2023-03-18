import {db} from "../../../index";

export async function getUsersDoNotHaveAccessToFile(fileId:string){
    const sql = `SELECT u.id, u.name, u.phone_number, r.role_name
                 FROM users u
                 LEFT JOIN roles_users ru ON u.id = ru.user_id
                 LEFT JOIN roles r ON r.id = ru.role_id
                 WHERE u.id NOT IN (
                   SELECT du.user_id
                   FROM documents_users du
                   WHERE du.document_id = ${fileId}
                   )
                 ORDER BY u.name;`

    const result = await db.query(sql)
    return result.rows
}