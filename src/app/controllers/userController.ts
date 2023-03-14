import {Request, Response} from "express";
import {getUserWithRoleByPhone} from "../services/userServices/getUserWithRoleByPhone";
import {generateToken} from "../services/generateToken";
import {getAllUsers} from "../services/userServices/getAllUsers";
import {addNewUser} from "../services/userServices/addNewUser";

export async function loginController(req: Request, res: Response){
    try {
        const phoneNumber: string = req.body.phoneNumber as string
        const result = await getUserWithRoleByPhone(phoneNumber)

        if(!result){
            return res.status(500).json({message: "Access denied."})
        }

        const token:string = generateToken(result.phone_number, result.role_name)

        return res.status(201).json({token: token})
    } catch (e) {
        return res.status(500).json({message: "Access denied."})
    }
}

export async function addUserController(req: Request, res: Response) {
    try {
        const phoneNumber: string = req.body.phoneNumber as string
        const role: string = req.body.role as string
        const name: string = req.body.name as string

        const result = await addNewUser(phoneNumber, role, name)
        if(!result){
            return res.status(422).json({message: "User already exist."})
        }

        return res.status(201).json({message: "Success"})
    } catch (e) {
        return res.status(405).json({message: "Error"})
    }
}

export async function getAllUsersController(req: Request, res: Response){
    try {
        const users = await getAllUsers()

        return res.status(201).json(users)
    } catch (e) {
        return res.status(503).json({error: e})
    }
}