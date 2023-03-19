import  {Request, Response} from "express";
import {uploadFile} from "../services/fileServices/uploadFile";
import {getLinkOfFileByName} from "../services/fileServices/getLinkOfFileByName";
import {addNewFileToDB} from "../services/fileServices/addNewFileToDB";
import {addPermissionToFile} from "../services/fileServices/addPermissionToFile";
import {getAllAvailableFiles} from "../services/fileServices/getAllAvailableFiles";
import {markAsReadService} from "../services/fileServices/markAsReadService";
import {getAllFiles} from "../services/fileServices/getAllFiles";
import {deleteFile} from "../services/fileServices/deleteFile";
import {getFilesUserHaveAccess} from "../services/userServices/getFilesUserHaveAccess";
import {addLinksToFiles} from "../services/userServices/addLinksToFiles";

export async function postFileController(req: Request, res: Response): Promise<Response>{
    try {
        const fileName: string = req.headers.file_name as string
        const fileBytes = req.body

        await addNewFileToDB(fileName)
        await uploadFile(fileName, fileBytes)

        return res.status(200).json({message: "Success"})
    } catch (e){
        return res.status(405).json({error: e})
    }
}

export async function addPermissionToFileController(req: Request, res: Response)    {
    try{
        const userPhoneNumbers: [string] = req.body.userPhoneNumbers as [string]
        const fileName: string = req.body.fileName

        await addPermissionToFile(userPhoneNumbers, fileName)

        return res.status(201).json({message: "Success."})
    } catch (e) {
        return res.status(405).json({error: e})
    }
}

export async function getLinkOfFileByNameController(req: Request, res: Response): Promise<Response> {
    try {
        const fileName: string = req.headers.file_name as string;

        const url: string = await getLinkOfFileByName(fileName)

        if (url) {
            return res.status(200).json({message: "Success", link: url})
        } else {
            return res.status(404).json({message: "File not found."})
        }
    }catch (e) {
        return res.status(405).json({message: e})
    }
}

export async function getAllAvailableFilesController(req: Request, res: Response) {
    try{
        // @ts-ignore
        const phoneNumber:string = req.decodedPayload.phoneNumber
        const hasAlreadyBeenRead:boolean = JSON.parse(req.headers.has_already_been_read as string)

        const result = await getAllAvailableFiles(phoneNumber,hasAlreadyBeenRead)

        return res.status(200).json(result)
    } catch (e) {
        return res.status(405).json({error: e})
    }
}

export async function getAllFilesController(req: Request, res: Response) {
    try{
        const result = await getAllFiles()

        return res.status(200).json(result)
    } catch (e) {
        return res.status(405).json({error: e})
    }
}

export async function markAsReadController(req: Request, res: Response){
    try {
        // @ts-ignore
        const phoneNumber:string = req.decodedPayload.phoneNumber
        const fileName: string = req.headers.file_name as string

        await markAsReadService(phoneNumber, fileName)

        return res.status(202).json({message: "Success."});
    } catch (e) {
        return res.status(500).json({error: e})
    }
}

export async function deleteFideController(req: Request, res: Response) {
    try {
        const fileId: string = req.headers.file_id as string
        await deleteFile(fileId)
        return res.status(201).json({message: "File deleted"})
    } catch (e) {
        return res.status(503).json({error: e})
    }
}

export async function getFilesUserHaveAccessController(req: Request, res: Response) {
    try {
        const userId: string = req.headers.user_id as string
        const files = await getFilesUserHaveAccess(userId)
        const filesWithLinks = await addLinksToFiles(files)

        return res.status(201).json(filesWithLinks)
    } catch (e) {
        return res.status(503).json({error: e})
    }
}