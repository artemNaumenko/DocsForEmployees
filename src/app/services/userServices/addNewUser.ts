import {db} from "../../../index";

export async function addNewUser(phoneNumber: string, role: string, name: string) {
    try {
        const insertUser =  `INSERT INTO users (phone_number, name) 
                             VALUES ('${phoneNumber}', '${name}') RETURNING id;`
        const user_id = (await db.query(insertUser)).rows[0].id

        if(!user_id){
            return false
        }

        const insertRoleUser = `INSERT INTO roles_users (user_id, role_id)
                                SELECT ${user_id}, r.id
                                FROM roles r
                                WHERE r.role_name = '${role}';`

        await db.query(insertRoleUser)

        return true;
    }   catch (e) {
        return false;
    }
}