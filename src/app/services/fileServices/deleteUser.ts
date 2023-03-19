import {db} from "../../../index";

export async function deleteUser(userId: string) {
    const sql = `DELETE FROM roles_users WHERE user_id = ${userId};
                    DELETE FROM documents_users WHERE user_id = ${userId};
                    DELETE FROM users WHERE id = ${userId};`

    await db.query(sql)
}