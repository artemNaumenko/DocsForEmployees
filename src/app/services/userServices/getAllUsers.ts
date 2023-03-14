import {db} from "../../../index";

export async function getAllUsers(){
    const result = await db.query("SELECT * FROM users;")

    return result.rows
}