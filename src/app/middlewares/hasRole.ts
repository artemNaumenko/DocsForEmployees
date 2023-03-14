import {Request, Response} from "express";

export function hasRole(role:string) {
    return function (req: Request, res: Response, next: Function) {
        try{
            // @ts-ignore
            const payload = req.decodedPayload
            if(payload.role === role){
                return next()
            }

            return res.status(403).json({message: "Permission denied."})
        } catch (e){
            return res.status(403).json({message: "Permission denied."})
        }
    }

}