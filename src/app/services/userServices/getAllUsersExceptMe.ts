import {db} from "../../../index";

export async function getAllUsersExceptMe(phoneNumber:string){
    const sql = `SELECT u.id, u.name, u.phone_number, r.role_name
                 FROM users u
                 INNER JOIN roles_users ru ON u.id = ru.user_id
                 INNER JOIN roles r ON r.id = ru.role_id
                 WHERE u.phone_number != '${phoneNumber}'
                 ORDER BY u.id;`

    const result = await db.query(sql)

    return result.rows
}