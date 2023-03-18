import {db} from "../../../index";

export async function checkIfUserExists(phoneNumber: string) {
    const sql = `SELECT count(id) FROM users WHERE phone_number='${phoneNumber}';`
    const result = await db.query(sql)

    if(result.rows[0].count === '0'){
        return false
    }
    return true
}