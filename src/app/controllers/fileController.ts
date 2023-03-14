import  {Request, Response} from "express";
import {uploadFile} from "../services/fileServices/uploadFileTest";
import {getLinkOfFileByName} from "../services/fileServices/getLinkOfFileByName";

export async function postFileController(req: Request, res: Response): Promise<Response>{
    const fileName: string = req.headers.file_name as string
    const fileBytes = req.body

    console.log(fileBytes)
    console.log(fileName)
    await uploadFile(fileName, fileBytes)

    return res.status(200).json({message: "Success"})
}

export async function getLinkOfFileByNameController(req: Request, res: Response): Promise<Response> {
    const fileName: string = req.headers.file_name as string;

    const url: string = await getLinkOfFileByName(fileName)

    if(url){
        return res.status(200).json({message: "Success", link: url})
    } else {
        return res.status(404).json({message: "Failed"})
    }
}