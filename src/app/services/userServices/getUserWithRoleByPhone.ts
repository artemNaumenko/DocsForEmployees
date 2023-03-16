import {db} from "../../../index";

export async function getUserWithRoleByPhone(phoneNumber:string) {

    const res = await db.query(
        "SELECT u.phone_number, u.password, r.role_name FROM users u " +
        "JOIN roles_users ru ON u.id = ru.user_id " +
        "JOIN roles r ON ru.role_id = r.id " +
        `WHERE u.phone_number = '${phoneNumber}';`)

    return res.rows[0]
}